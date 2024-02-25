import {
  renderHook,
  act,
  waitFor,
  RenderHookResult,
} from '@testing-library/react';
import usePrefecture from './usePrefecture';
import { server } from '@/mock/server';
import { MOCK_RESAS_API_KEY, MOCK_NO_RESPONSE } from '@/mock/constants';
import { prefectures } from '@/mock/data/prefecture';

beforeAll(() => server.listen());

beforeEach(() => (process.env.NEXT_PUBLIC_RESAS_API_KEY = MOCK_RESAS_API_KEY));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('usePrefecture', () => {
  test('state: loading', async () => {
    let renderResult!: RenderHookResult<
      ReturnType<typeof usePrefecture>,
      Parameters<typeof usePrefecture>
    >['result'];
    act(() => {
      const { result } = renderHook(() => usePrefecture());
      renderResult = result;
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(true);
    });
    expect(renderResult.current.prefectures).toBeUndefined();
    expect(renderResult.current.isLoading).toBe(true);
    expect(renderResult.current.errorMessage).toBe('');

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(false);
    });
  });

  test('state: data fetch', async () => {
    let renderResult!: RenderHookResult<
      ReturnType<typeof usePrefecture>,
      Parameters<typeof usePrefecture>
    >['result'];
    act(() => {
      const { result } = renderHook(() => usePrefecture());
      renderResult = result;
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(false);
    });
    expect(renderResult.current.prefectures).toEqual(prefectures);
    expect(renderResult.current.isLoading).toBe(false);
    expect(renderResult.current.errorMessage).toBe('');
  });

  test('state: HTTPError', async () => {
    process.env.NEXT_PUBLIC_RESAS_API_KEY = '';
    let renderResult!: RenderHookResult<
      ReturnType<typeof usePrefecture>,
      Parameters<typeof usePrefecture>
    >['result'];

    act(() => {
      const { result } = renderHook(() => usePrefecture());
      renderResult = result;
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(false);
    });
    expect(renderResult.current.prefectures).toBeUndefined;
    expect(renderResult.current.isLoading).toBe(false);
    expect(renderResult.current.errorMessage).toBe(
      '都道府県データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。',
    );
  });

  test('state: Error', async () => {
    process.env.DUMMY_REQUEST = MOCK_NO_RESPONSE;
    let renderResult!: RenderHookResult<
      ReturnType<typeof usePrefecture>,
      Parameters<typeof usePrefecture>
    >['result'];

    act(() => {
      const { result } = renderHook(() => usePrefecture());
      renderResult = result;
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(renderResult.current.isLoading).toBe(false);
    });
    expect(renderResult.current.prefectures).toBeUndefined;
    expect(renderResult.current.isLoading).toBe(false);
    expect(renderResult.current.errorMessage).toBe(
      '想定しない都道府県データが取得されました。',
    );
  });
});
