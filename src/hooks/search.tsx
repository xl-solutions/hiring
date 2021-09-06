import React, { createContext, useContext, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

const { SERIES_INTRADAY } = process.env;
const { SYMBOL_SEARCH } = process.env;

type FetchLoadProviderProps = {
  children: ReactNode;
};

type FetchLoadContextData = {
  search(params?: string): Promise<void>;
  loadingIntraday(params: string): Promise<void>;
};

type IntraDayData = {
  'Meta Data': MetaData;
  'Time Series (5min)': {
    [key in string]: TimesSeries;
  };
};

type TimesSeries = {
  [key in TimeAttribution]: string;
};

type MetaData = {
  [key in MetaDataAttribution]: string;
};

type MetaDataAttribution =
  | '1. open'
  | '2. high'
  | '3. low'
  | '4. close'
  | '5. volume';

type TimeAttribution =
  | '1. Information'
  | '2. Symbol'
  | '3. Last Refreshed'
  | '4. Interval'
  | '5. Output Size'
  | '6. Time Zone';

type RequestSearch = {
  bestMatches: BestMatches[];
};

type BestMatches = {
  [key in BestMatchesAttributions]: string;
};

type BestMatchesAttributions =
  | '1. symbol'
  | '2. name'
  | '3. type'
  | '4. region'
  | '5. marketOpen'
  | '6. marketClose'
  | '7. timezone'
  | '8. currency'
  | '9. matchScore';

const FetchLoadContext = createContext<FetchLoadContextData>(
  {} as FetchLoadContextData,
);

function FetchLoadProvider({ children }: FetchLoadProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<IntraDayData>();
  const [bestMatchesActions, setBestMatchesActions] = useState<BestMatches[]>(
    [],
  );

  async function search(keywords: string = ''): Promise<void> {
    try {
      setLoading(true);
      const response = await api.get('', {
        params: {
          keywords,
          function: SYMBOL_SEARCH,
        },
      });

      const { bestMatches } = response.data as RequestSearch;

      console.log('bestMatches :', bestMatches);
      setBestMatchesActions(bestMatches);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function loadingIntraday(symbol: string): Promise<void> {
    try {
      setLoading(true);
      const response = await api.get('', {
        params: {
          function: SERIES_INTRADAY,
          symbol,
        },
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveAsyncStorage(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      throw new Error(error);
    }
  }

  async function getAsyncStorage(key: string): Promise<any | null> {
    try {
      const response = await AsyncStorage.getItem(key);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <FetchLoadContext.Provider value={{ loadingIntraday, search }}>
      {children}
    </FetchLoadContext.Provider>
  );
}

function useFetch(): FetchLoadContextData {
  const context = useContext(FetchLoadContext);

  if (!context) {
    throw Error('userAuth must be used within an FetchLoadProvider');
  }

  return context;
}

export { FetchLoadProvider, useFetch };
