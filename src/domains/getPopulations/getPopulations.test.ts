import { HTTPError } from 'ky';
import getPopulations from './getPopulations';
import { populationCategories } from '@/mock/data/population';
import { server } from '@/mock/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('getPopulations', () => {
  test('request: 200', () => {
    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
    }).then((data) => {
      expect(data).toEqual(populationCategories);
    });
  });

  // API KEY がない場合
  test('request: 403', () => {
    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
      headers: {},
    })
      .then(() => {})
      .catch((err) => {
        expect(err).toBeInstanceOf(HTTPError);
        if (err instanceof HTTPError) {
          expect(err.response.status).toEqual(403);
        }
      });
  });
});
