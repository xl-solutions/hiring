import mockAxios from 'jest-mock-axios';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import { FetchDataProvider, useFetch } from './fetchData';

// jest.mock('axios', () => {
//   return {
//     create: function () {
//       return this;
//     },
//     get: () => {
//       return Promise.resolve({ data: { bestMatches: [] } });
//     },
//   };
// });

describe('FetchData Hook', () => {
  afterEach(() => {
    cleanup;
    mockAxios.reset();
  });

  it('should be able to Search from symbol', async () => {
    const { result } = renderHook(() => useFetch(), {
      wrapper: FetchDataProvider,
    });

    await act(() => result.current.search('IBM.DEX'));

    expect(result.current.bestMatchesActions).toBeTruthy();
    expect(result.current.bestMatchesActions.length).toEqual(1);
    expect(result.current.bestMatchesActions[0]['1. symbol']).toEqual(
      'TSCO.LON',
    );
  });

  it('should be able to saveAsyncStorage', async () => {
    const { result } = renderHook(() => useFetch(), {
      wrapper: FetchDataProvider,
    });

    const { PORTFOLIO_ACTIONS } = process.env;

    await act(() =>
      result.current.saveAsyncStorage(String(PORTFOLIO_ACTIONS), [
        'Lucas',
        'Pedro',
      ]),
    );

    const response = await act(() =>
      result.current.getAsyncStorage(String(PORTFOLIO_ACTIONS)),
    );

    console.log(response);
    // expect(response).toBeTruthy();
    // expect(result.current.bestMatchesActions.length).toEqual(1);
    // expect(result.current.bestMatchesActions[0]['1. symbol']).toEqual(
    //   'TSCO.LON',
    // );
  });

  // it('should be able to Search from symbol Error cath', async () => {
  //   await expect(async () => {
  //     const { result } = renderHook(() => useFetch(), {
  //       wrapper: FetchDataProvider,
  //     });

  //     await act(() => result.current.search());
  //   }).rejects.toBeInstanceOf(Error);
  // });
});
