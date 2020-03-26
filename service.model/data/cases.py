import urllib.request
from bs4 import BeautifulSoup
import pandas as pd
import pdb

class Crawler():

  def __init__(self, country, state=None):
    self.country = country
    self.state = state
    self.url = 'https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series'
    self.raw_url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/'
    self.files = ['confirmed_global', 'deaths_global']

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
      #print(link)
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

  def query_data(self, df,file,country, state=None):

    if state:
      df_subset=df[(df['Country/Region'] == country) & (df['Province/State'] == state)]

      data=pd.melt(df_subset, id_vars=['Province/State', 'Country/Region'],
            var_name ='date',
            value_vars=df_subset.iloc[:,4:],
            value_name =file)
    else:
      df_subset=df[(df['Country/Region'] == country)]

      data=pd.melt(df_subset, id_vars=['Country/Region'],
            var_name ='date',
            value_vars=df_subset.iloc[:,4:],
            value_name =file)
    return data

  def merge_data(self, df1, df2, has_state=False):
    if has_state:
      output = df1.merge(df2, left_on=['Province/State', 'Country/Region', 'date'], right_on=['Province/State', 'Country/Region', 'date'])
    else:
      output = df1.merge(df2, left_on=['Country/Region', 'date'], right_on=['Country/Region', 'date'])
    return output

  def query(self):
    soup = self.scrapePage(self.url)
    file_list = self.query_files(soup)

    output = None
    for file in self.files:
      df = self.get_file(self.raw_url,file_list, file)
      df = self.query_data(df,file,self.country,self.state)

      if type(output) == type(None):
        output = df
      else:
        if self.state:
          output = self.merge_data(output, df, has_state=True)
        else:
          output = self.merge_data(output, df, has_state=False)

    return output

  def convert_to_json(self,df):
    """
    converts to json string as a list
    """
    return df.to_json(orient='records')

  def filter_data(self, df, start_date, interval=4):

      df['date'] = pd.to_datetime(df['date'])
      df = df[df['date'] >= start_date]

      df.reset_index(drop=True, inplace=True)
      df = df[df.index % interval == 0]

      period_increase = df['confirmed_global'] - df['confirmed_global'].shift(1, fill_value=0)
      df['cases'] = period_increase
      return df


if __name__ == '__main__':
    # display options
    pd.set_option('display.width', 100)
    pd.set_option('display.max_columns', 10)

    country = 'Australia'
    state = 'Victoria'
    start_date = '2020-03-10'

    crawler = Crawler(country, state)
    df = crawler.query()

    filtered_df = crawler.filter_data(df, start_date, interval=4)
    print(filtered_df)
    json_output = crawler.convert_to_json(df)
