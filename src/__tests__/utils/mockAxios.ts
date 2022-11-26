import { AxiosStatic } from 'axios';

export const defaultResponseForAxios = {
  symbol: 'IBM',
  regularMarketTime: 82914590185,
  regularMarketPrice: 12.02,
};

export function getMockedAxios(duckTypeError: boolean = false) {
  const errorDefault = { ...defaultResponseForAxios, symbol: undefined };
  return {
    get: (link: string) => {
      return new Promise((resolve) => {
        //THATS SO STUPIDDDDAKSJOHFgQÇKJGLDSFJHUYkyjhdluyh
        resolve({
          data: {
            spark: {
              result: [
                {
                  response: [
                    {
                      meta: duckTypeError ? errorDefault : defaultResponseForAxios,
                    },
                  ],
                },
              ],
            },
          },
        });
      });
    },
  } as unknown as AxiosStatic;
}
