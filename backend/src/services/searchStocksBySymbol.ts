import { api } from './api';

interface IData {
  bestMatches: BestMatch[];
}

export interface BestMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

export async function searchStocksBySymbol(
  keyword: string,
): Promise<BestMatch[]> {
  const params = {
    function: 'SYMBOL_SEARCH',
    keywords: keyword,
  };

  try {
    const { data }: { data: IData } = await api.get('/', { params });

    console.log(data);
    return data.bestMatches;
  } catch (error) {
    console.log(error);
  }
}
