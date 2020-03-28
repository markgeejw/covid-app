import urllib.request
from bs4 import BeautifulSoup
import pandas as pd
import logging
import pdb
import json
import sys
import time
pd.options.mode.chained_assignment = None

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if logging.root.handlers == []:
    ch = logging.StreamHandler(sys.stdout)
    ch.setFormatter(logging.Formatter('%(asctime)s %(levelname)s %(message)s'))
    logger.addHandler(ch)

class Crawler():

  def __init__(self):
    self.url = 'https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series'
    self.raw_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/'
    self.files = ['confirmed_global', 'deaths_global'] #, 'recovered_global']
    self.country_col = 'Country/Region'
    self.state_col = 'Province/State'
    self.cases_col = 'confirmed_global'

  def scrapePage(self, url):
    """
    Params
    --------
    url:string

    Output
    --------
    string
    """

    # Open the URL as Browser, not as python urllib
    page=urllib.request.Request(url,headers={'User-Agent': 'Mozilla/5.0'})
    infile=urllib.request.urlopen(page).read()
    data = infile.decode('ISO-8859-1')
    soup = BeautifulSoup(data, "lxml")
    return soup

  def query_files(self,soup):
    file_list = []
    for link in soup.find_all('tr', attrs={'class':'js-navigation-item'}):
      for row in link.find_all("a", attrs={'class':'js-navigation-open'}):
        if row.get("href").endswith('.csv'):
          fname = row.get("href").split('/')[-1]
          file_list.append(fname)

    return file_list

  def get_file(self, raw_url,file_list, file):
    df_list = []
    for fname in file_list:
      if file in fname:
        download_url= raw_url + fname
        df=pd.read_csv(download_url)
    return df

  def merge_data(self, df1, df2, has_state=False):
    if has_state:
      output = df1.merge(df2, left_on=[self.state_col, self.country_col, 'date'], right_on=[self.state_col, self.country_col, 'date'])
    else:
      output = df1.merge(df2, left_on=[self.country_col, 'date'], right_on=[self.country_col, 'date'])
    return output

  def query_single(self, country, state=None):
    soup = self.scrapePage(self.url)
    file_list = self.query_files(soup)

    output = None
    for file in self.files:
      df = self.get_file(self.raw_url,file_list, file)
      df = self.pivot_data(df,file)
      df = self.filter_dataset(df,country,state)

      # merge datasets together
      if type(output) == type(None):
        output = df
      else:
        if state:
          output = self.merge_data(output, df, has_state=True)
        else:
          output = self.merge_data(output, df, has_state=False)

    return output

  def df_to_json(self,df):
    """
    converts to json string as a list
    """
    return df.to_json(orient='records')

  def pivot_data(self, df, file):
      df=pd.melt(df, id_vars=[self.state_col, self.country_col],
            var_name ='date',
            value_vars=df.iloc[:,4:],
            value_name =file)
      return df

  def filter_dataset(self, df, country, state):

    if state:
      df_subset=df[(df[self.country_col] == country) & (df[self.state_col] == state)]
    else:
      df_subset=df[(df[self.country_col] == country)]
      df_subset = df_subset.groupby([self.country_col, 'date']).agg('sum')
      df_subset.reset_index(drop=False, inplace=True)
    df_subset.reset_index(drop=True, inplace=True)

    return df_subset

  def periodic_dataset(self,df, start_date, interval=4):
    df['date'] = pd.to_datetime(df['date'])
    df = df[df['date'] >= start_date]

    # reverse df to take the latest dates for daily increase calculation
    rev_df = df[::-1]
    rev_df.reset_index(drop=True, inplace=True)
    rev_df = rev_df[rev_df.index % interval == 0]

    period_increase = rev_df[self.cases_col] - rev_df[self.cases_col].shift(-1, fill_value=0)

    # bring it back to normal
    df = rev_df[::-1]
    df['cases'] = period_increase
    return df

  def query_regions(self):
    soup = self.scrapePage(self.url)
    file_list = self.query_files(soup)

    for fname in file_list:
      download_url= self.raw_url + fname
      df=pd.read_csv(download_url)
      break

    return df[[self.state_col, self.country_col]]

  def convert_to_json(self,df, has_state=False):
    country = df[self.country_col].unique().item()
    cases = df['cases'].values.tolist()

    if has_state:
      state = df[self.state_col].unique().item()

      output = {'Country/Region':country,
                'Province/State':state,
                'cases':cases
              }
    else:
      output = {'Country/Region':country,
                'Province/State':'',
                'cases':cases
                }
    return output


  def query_entire(self):
    soup = self.scrapePage(self.url)
    file_list = self.query_files(soup)

    df_list = []
    output_nostate, output_state = [None, None]

    for file in self.files:
      for fname in file_list:
        if file in fname:
          download_url= self.raw_url + fname
          df=pd.read_csv(download_url)

          df = self.pivot_data(df, file)

          # filter for province
          if type(output_nostate) == type(None):
            output_nostate = df[(pd.isnull(df[self.state_col]))][df.columns[1:]]
            output_state=df[(pd.notnull(df[self.state_col]))]
          else:
            df1_subset=df[(pd.isnull(df[self.state_col]))][df.columns[1:]]
            output_nostate = self.merge_data(output_nostate, df1_subset, has_state=False)

            df2_subset=df[(pd.notnull(df[self.state_col]))]
            output_state = self.merge_data(output_state, df2_subset, has_state=True)

    # combine dataframes together
    output_nostate[self.state_col] = None
    result = pd.concat([output_state, output_nostate], ignore_index=True, sort=False)
    return result

  def export_json(self,filepath, json_data):
    try:
      with open(filepath, 'w') as f:
        json.dump(json_data,f, indent=4)
      logger.info('cases json saved successfully')
    except:
      logger.debug('issue saving file')

  def import_json(self, filepath, import_type='dataframe'):
    try:

      if import_type=='dataframe':
        df = pd.read_json(filepath, orient='records')
        logger.info('loaded cases json successfully')
        return df
      else:
        with open(filepath, 'r') as f:
          data = json.load(f)
          logger.info('loaded cases json successfully')
          return data
    except:
      logger.debug('issue loading file')


if __name__ == '__main__':
  # display options
  pd.set_option('display.width', 100)
  pd.set_option('display.max_columns', 10)

  # single dataset
  country = 'Australia'
  state = None
  start_date = '2020-03-10'

  start = time.time()

  crawler = Crawler()
  df = crawler.query_single(country=country, state=state)
  filtered_df = crawler.periodic_dataset(df,start_date, interval=1)
  print('---- single data ----')
  print(filtered_df)

  end = time.time()
  print('query online dataset end time:{:.2f}'.format(end-start))

  start = time.time()
  #full dataset
  crawler = Crawler()
  regions_df = crawler.query_regions()

  entire_dataset = crawler.query_entire()

  print('\n---- saving entire data to json ----')
  output = entire_dataset.to_dict(orient='records')
  crawler.export_json('cases.json', output)

  end = time.time()
  print('saving entire dataset end time:{:.2f}'.format(end-start))

  start = time.time()
  print('\n---- query cases from json load ----')
  country = 'Australia'
  state = None
  df = crawler.import_json('cases.json', import_type='dataframe')
  df = crawler.filter_dataset(df,country, state)
  filtered_df = crawler.periodic_dataset(df,start_date, interval=1)
  print(filtered_df)

  end = time.time()
  print('load and query flat dataset end time:{:.2f}'.format(end-start))
