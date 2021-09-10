import React, { createContext, useContext, ReactNode, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { AppError } from '../services/AppError';
import {
  comparHistoricActions,
  formattedData,
} from '../utils/fetchDataFormatted';

const { SERIES_INTRADAY } = process.env;
const { SYMBOL_SEARCH } = process.env;
const { SYMBOL_GLOBAL_QUOTE } = process.env;
const { SERIES_DAILY_ADJUSTED } = process.env;

type FetchDataProviderProps = {
  children: ReactNode;
};

type FetchLoadContextData = {
  search(params?: string): Promise<void>;
  loadingIntraday(params: string): Promise<void>;
  loadingGlobalQuote(params: string): Promise<void>;
  loadingDailyAdjusted(
    params: string,
    outPutSize: OutPutSize,
    intervalDates: string[],
  ): Promise<void>;
  saveAsyncStorage(key: string, data: any): Promise<void>;
  getAsyncStorage(key: string): Promise<any | null>;
  loading: boolean;
  bestMatchesActions: BestMatches[];
  detailsAction: DetailsActionProps;
  timesSeriesDay: TimesSeries[];
};

type IntraDayData = {
  'Meta Data': MetaData;
  'Time Series (Daily)': {
    [key in string]: TimesSeries;
  };
};

type TimesSeries = {
  [key in MetaDataAttribution]: string;
};

type MetaData = {
  [key in TimeAttribution]: string;
};

type MetaDataAttribution =
  | '1. open'
  | '2. high'
  | '3. low'
  | '4. close'
  | '5. adjusted close'
  | '6. volume'
  | '7. dividend amount'
  | '8. split coefficient';

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

type RequestDetailsActions = {
  'Global Quote': DetailsActionAttributions;
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

type DetailsActionProps = {
  [key in DetailsActionAttributions]: string;
};

type DetailsActionAttributions =
  | '01. symbol'
  | '02. open'
  | '03. high'
  | '04. low'
  | '05. price'
  | '06. volume'
  | '07. latest trading day'
  | '08. previous close'
  | '09. change'
  | '10. change percent';

type OutPutSize = 'full' | 'compact';

const FetchLoadContext = createContext<FetchLoadContextData>(
  {} as FetchLoadContextData,
);

function FetchDataProvider({ children }: FetchDataProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [bestMatchesActions, setBestMatchesActions] = useState<BestMatches[]>(
    [],
  );
  const [detailsAction, setDetailsAction] = useState<DetailsActionProps>(
    {} as DetailsActionProps,
  );

  const [timesSeriesDay, setTimeSeriesDay] = useState<TimesSeries[]>(
    [] as TimesSeries[],
  );

  async function search(keywords: string = ''): Promise<void> {
    try {
      setLoading(true);
      const response = await api.get('', {
        params: {
          keywords,
          function: String(SYMBOL_SEARCH),
        },
      });

      console.log(response.data);
      const { bestMatches } = response.data as RequestSearch;

      setBestMatchesActions(bestMatches);
      /**
       * Esta function realiza a formatação do response.data, entretanto até o momento
       * não houve ncessidade de utilizar no projeto
       */
      // formattedData(bestMatches);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw new AppError(error);
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
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      throw new Error(error);
    }
  }

  async function loadingDailyAdjusted(
    symbol: string,
    outPutSize: OutPutSize,
    intervalDates: string[],
  ) {
    try {
      setLoading(true);

      const response = await api.get('', {
        params: {
          function: SERIES_DAILY_ADJUSTED,
          symbol,
          outputsize: outPutSize,
        },
      });

      const dataResponse = response.data as IntraDayData;

      // verifica se o intervalo de dadtas fazem match com response time series do symbol que foi passado
      const formattedSeriesDay = await comparHistoricActions(
        dataResponse['Time Series (Daily)'],
        intervalDates,
      );

      // formattedData([...dataResponse['Time Series (Daily)']]);

      setTimeSeriesDay(formattedSeriesDay);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  }

  async function loadingGlobalQuote(symbol: string): Promise<void> {
    try {
      setLoading(true);
      const response = await api.get('', {
        params: {
          symbol,
          function: SYMBOL_GLOBAL_QUOTE,
        },
      });

      console.log(response.data);
      const data = response.data as RequestDetailsActions;

      setDetailsAction(data['Global Quote']);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      throw new Error(error);
    }
  }

  async function saveAsyncStorage(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function getAsyncStorage(key: string): Promise<any | null> {
    try {
      const response = await AsyncStorage.getItem(key);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <FetchLoadContext.Provider
      value={{
        loadingIntraday,
        search,
        loadingGlobalQuote,
        saveAsyncStorage,
        getAsyncStorage,
        loadingDailyAdjusted,
        bestMatchesActions,
        loading,
        detailsAction,
        timesSeriesDay,
      }}>
      {children}
    </FetchLoadContext.Provider>
  );
}

function useFetch(): FetchLoadContextData {
  const context = useContext(FetchLoadContext);

  if (!context) {
    throw Error('userAuth must be used within an FetchDataProvider');
  }

  return context;
}

export { FetchDataProvider, useFetch };
