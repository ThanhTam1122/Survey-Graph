import { fireEvent, render } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import usePopulation, { actionType, reducer } from './usePopulation';
import { server } from '@/mock/server';
import {
  MOCK_RESAS_API_KEY,
  MOCK_NO_RESPONSE,
  MOCK_NOT_ALL_POPULATION,
} from '@/mock/constants';
import { populationCategoriesB, populations } from '@/mock/data/population';

const prefectureCodeA = 1;
const prefectureNameA = '北海道';
const prefectureNameB = '青森県';

beforeAll(() => server.listen());

beforeEach(() => {
  process.env.NEXT_PUBLIC_RESAS_API_KEY = MOCK_RESAS_API_KEY;
  process.env.DUMMY_REQUEST = '';
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('reducer', () => {
  test('add population', () => {
    const state = populations.filter(
      (population) => population.name === prefectureNameA
    );
    const newState = reducer(state, {
      type: actionType.ADD_POPULATION,
      prefName: prefectureNameB,
      payload: populationCategoriesB.result?.data.find(
        (category) => category.label === '総人口'
      ),
    });
    expect(newState).toEqual(populations);
  });

  test('remove population', () => {
    const state = populations;
    const newState = reducer(state, {
      type: actionType.REMOVE_POPULATION,
      prefName: prefectureNameA,
    });
    expect(newState).toEqual(
      populations.filter((population) => population.name !== prefectureNameA)
    );
  });
});

describe('usePopulation', () => {
  test('state: initial', () => {
    act(() => {
      const { result } = renderHook(() => usePopulation());
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');
    });
  });

  test('state: prefecture check', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);

      await waitFor(() => result.current.isLoading === true);
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.errorMessage).toBe('');

      await waitFor(() => result.current.isLoading === false);
      expect(result.current.populations).toEqual(
        populations.filter((population) => population.name === prefectureNameA)
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');
    });
  });

  test('state: prefecture uncheck', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);
      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.populations).toEqual(
        populations.filter((population) => population.name === prefectureNameA)
      );

      fireEvent.click(el);
      expect(result.current.populations).toEqual([]);
      expect(result.current.errorMessage).toBe('');
    });
  });

  test('state: prefecture check not all population', async () => {
    process.env.DUMMY_REQUEST = MOCK_NOT_ALL_POPULATION;
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);

      await waitFor(() => result.current.isLoading === true);
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.errorMessage).toBe('');

      await waitFor(() => result.current.isLoading === false);
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe(
        '想定しない人口遷移データが取得されました。'
      );
    });
  });

  test('state: prefecture check HTTPError', async () => {
    process.env.NEXT_PUBLIC_RESAS_API_KEY = '';
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe(
        `${prefectureNameA}の人口遷移データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。`
      );
    });
  });

  test('state: prefecture check Error', async () => {
    process.env.DUMMY_REQUEST = MOCK_NO_RESPONSE;
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.populations).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe(
        '想定しない人口遷移データが取得されました。'
      );
    });
  });

  test('state: reset error', async () => {
    process.env.DUMMY_REQUEST = MOCK_NO_RESPONSE;
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePopulation());
      const { getAllByTestId } = render(
        <input
          data-testid="dummy-input"
          type="checkbox"
          onChange={result.current.handlePrefectureCheck(
            prefectureCodeA,
            prefectureNameA
          )}
        />
      );
      const el = getAllByTestId('dummy-input')[0];
      fireEvent.click(el);

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.errorMessage).toBe(
        '想定しない人口遷移データが取得されました。'
      );

      result.current.handleResetError();
      expect(result.current.errorMessage).toBe('');
    });
  });
});
