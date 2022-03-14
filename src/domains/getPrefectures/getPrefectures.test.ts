import { HTTPError } from 'ky';
import getPrefectures from './getPrefectures';
import {
  MOCK_RESAS_API_KEY,
  MOCK_NO_RESPONSE,
  MOCK_TOO_MANY_REQUESTS,
} from '@/mock/constants';
import { server } from '@/mock/server';
import { prefectures } from '@/mock/data/prefecture';
import { forbidden, tooManyRequests } from '@/mock/data/errorResponse';

beforeAll(() => server.listen());

beforeEach(() => {
  process.env.NEXT_PUBLIC_RESAS_API_KEY = MOCK_RESAS_API_KEY;
  process.env.DUMMY_REQUEST = '';
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('getPrefectures', () => {
  test('request: 200', () => {
    return getPrefectures().then((data) => {
      expect(data).toEqual(prefectures);
    });
  });

  test('request: 200 type guard error', () => {
    process.env.DUMMY_REQUEST = MOCK_NO_RESPONSE;

    return getPrefectures().catch((err) => {
      expect(err).toBeInstanceOf(Error);
    });
  });

  test('request: 403', () => {
    process.env.NEXT_PUBLIC_RESAS_API_KEY = '';

    return getPrefectures().catch(async (err) => {
      expect(err).toBeInstanceOf(HTTPError);
      if (err instanceof HTTPError) {
        expect(err.response.status).toEqual(403);
        expect(await err.response.json()).toEqual(forbidden);
      }
    });
  });

  test('request: 429', () => {
    process.env.DUMMY_REQUEST = MOCK_TOO_MANY_REQUESTS;

    return getPrefectures().catch(async (err) => {
      expect(err).toBeInstanceOf(HTTPError);
      if (err instanceof HTTPError) {
        expect(err.response.status).toEqual(429);
        expect(await err.response.json()).toEqual(tooManyRequests);
      }
    });
  });
});
