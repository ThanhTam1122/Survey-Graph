//import { HTTPError } from 'ky-universal';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import getPopulations from './getPopulations';
import { populationCategories } from '@/mock/population';
import { forbidden } from '@/mock/errorResponse';

const API_URL =
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear';

const okServer = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    res(ctx.status(200), ctx.json(populationCategories));
  })
);

const forbiddenServer = setupServer(
  rest.get(API_URL, (req, res, ctx) => {
    res(ctx.status(200), ctx.json(forbidden));
  })
);

describe('getPopulations', () => {
  test('request: 200', () => {
    okServer.listen();

    getPopulations()
      .then((data) => {
        expect(data).toEqual(populationCategories);
      })
      .catch(() => {});

    okServer.close();
  });

  // TODO 異常系テスト
  // test('request: 403', () => {
  //   forbiddenServer.listen();

  //   getPopulations().catch((err) => {
  //     expect(err).toBeInstanceOf(HTTPError);
  //   });

  //   forbiddenServer.close();
  // });
});
