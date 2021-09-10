import { renderHook, act } from '@testing-library/react-hooks';
import { FetchDataProvider, useFetch } from './fetchData';

describe('FetchData Hook', () => {
  it('should be able to Search from symbol', async () => {
    const { result } = renderHook(() => useFetch(), {
      wrapper: FetchDataProvider,
    });

    await act(() => result.current.search('IBM.DEX'));

    expect(result.current.bestMatchesActions).toBeTruthy();
  });
});
