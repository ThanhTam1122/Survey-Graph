import { MockedRequest, ResponseResolver, restContext } from 'msw';
import { prefectures } from '@/mock/data/prefecture';
import { populationCategories } from '@/mock/data/population';
import {
  badRequest,
  forbidden,
  tooManyRequests,
} from '@/mock/data/errorResponse';
import {
  MOCK_RESAS_API_KEY,
  MOCK_BAD_REQUEST,
  MOCK_TOO_MANY_REQUESTS,
} from '@/mock/constants';

// DAMMY_REQUEST を使うものは擬似的な分岐

export const mockPrefecture: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (process.env.DAMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return res(ctx.status(429), ctx.json(tooManyRequests));
  }

  if (req.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return res(ctx.status(200), ctx.json(forbidden));
  }

  return res(ctx.status(200), ctx.json(prefectures));
};

export const mockPopulation: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (process.env.DAMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return res(ctx.status(429), ctx.json(tooManyRequests));
  }

  if (req.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return res(ctx.status(200), ctx.json(forbidden));
  }

  if (
    !(
      req.url.searchParams.get('prefCode') &&
      req.url.searchParams.get('cityCode')
    ) ||
    process.env.DAMMY_REQUEST === MOCK_BAD_REQUEST
  ) {
    return res(ctx.status(200), ctx.json(badRequest));
  }

  return res(ctx.status(200), ctx.json(populationCategories));
};
