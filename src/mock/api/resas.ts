import { MockedRequest, ResponseResolver, restContext } from 'msw';
import { prefectures } from '@/mock/data/prefecture';
import { populationCategories } from '@/mock/data/population';
import { forbidden, notFound } from '@/mock/data/errorResponse';

export const mockPrefecture: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(prefectures));
};

export const mockPopulation: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (req.headers.get('X-API-KEY') === null) {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'application/json'),
      ctx.json(forbidden)
    );
  }

  return res(
    ctx.status(200),
    ctx.set('Content-Type', 'application/json'),
    ctx.json(populationCategories)
  );
};
