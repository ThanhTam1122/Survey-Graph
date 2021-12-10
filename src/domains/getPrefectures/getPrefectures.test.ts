//import { HTTPError } from 'ky-universal';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import getPrefectures from './getPrefectures';
import { prefectures } from '@/mock/prefecture';
import { forbidden } from '@/mock/errorResponse';

const API_URL = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';

const okServer = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    res(ctx.status(200), ctx.json(prefectures));
  })
);

const forbiddenServer = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    res(ctx.status(200), ctx.json(forbidden));
  })
);

describe('getPrefectures', () => {
  test('request: 200', () => {
    okServer.listen();

    getPrefectures()
      .then((data) => {
        expect(data).toEqual(prefectures);
      })
      .catch(() => {});

    okServer.close();
  });

  // TODO 異常系
});
