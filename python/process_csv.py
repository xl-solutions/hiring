import pandas 
import os



def process_csv(path):
    df = pandas.read_csv(path)
    print(df)
    os.remove(path)

