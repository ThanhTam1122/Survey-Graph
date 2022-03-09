//import { HTTPError } from 'ky';
import getPrefectures from './getPrefectures';
import { prefectures } from '@/mock/data/prefecture';
import { server } from '@/mock/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('getPrefectures', () => {
  test('request: 200', () => {
    return getPrefectures().then((data) => {
      expect(data).toEqual(prefectures);
    });
  });

  // TODO 異常系
});
