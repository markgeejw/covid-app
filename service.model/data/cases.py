import urllib.request
from bs4 import BeautifulSoup
import pandas as pd

class Crawler():

  def __init__(self, country, state):
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

  def getUpdatedCases(self, soup, country, state):
    """
    Params
    --------
    soup: string
    country: string
    state: string

    Output
    --------
    list

    Example output
    ----
    [{'Name': 'Victoria', 'Confirmed': '466 ...}]
    """

    data = []
    for link in soup.find_all('div', attrs={'id':'container_'+ country}):

      for row in link.find_all("tr"):
        row_list = []

        # retreive table heaers
        for header in row.find_all("th"):
          header_list.append(header.text)
        # retreive values in tables
        for row_line in row.find_all("td"):
          row_list.append(row_line.text.replace('\n','').replace(' ','').replace('★', ''))

        if len(row_list) > 0:
          # only retreive the row for a specific state
          if row_list[0] == state:
            cases_dict = dict(zip(header_list, row_list))
            data.append(cases_dict)

    return data

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

  def query_data(self, df,country,state, file):

    df_subset=df[(df['Country/Region'] == country) & (df['Province/State'] == state)]

    data=pd.melt(df_subset, id_vars=['Province/State', 'Country/Region'],
          var_name ='date',
          value_vars=df_subset.iloc[:,4:],
          value_name =file)
    return data

  def merge_data(self, df1, df2):
    output = df1.merge(df2, left_on=['Province/State', 'Country/Region', 'date'], right_on=['Province/State', 'Country/Region', 'date'])
    return output

  def query(self):
    soup = self.scrapePage(self.url)
    file_list = self.query_files(soup)

    output = None
    for file in self.files:
      df = crawler.get_file(self.raw_url,file_list, file)
      df = crawler.query_data(df,country,state,file)

      if type(output) == type(None):
        output = df
      else:
        output = self.merge_data(output, df)

    return output

  def convert_to_json(self,df):
    """
    converts to json string as a list
    """
    return df.to_json(orient='records')

  def filter_data(self, df, start_date, interval=4):
      """
      filter data to match model as periodically updates rather than cumulating
      """

      df['date'] = pd.to_datetime(df['date'])
      df = df[df['date'] >= start_date]

      df.reset_index(drop=True, inplace=True)
      df = df[df.index % interval == 0]

      period_increase = df['confirmed_global'] - df['confirmed_global'].shift(1, fill_value=0)
      df['cases'] = period_increase
      return df


if __name__ == '__main__':
  country = 'Australia'
  state = 'Victoria'
  start_date = '3/10/20'

  crawler = Crawler(country, state)
  df = crawler.query()
  filtered_df = crawler.filter_data(df, start_date, interval=4)
  json_output = crawler.convert_to_json(df)
