import { HttpRequestHandler, HttpResponse } from 'msw';
import { prefectures } from '@/mock/data/prefecture';
import { populationCategoriesA } from '@/mock/data/population';
import {
  badRequest,
  forbidden,
  tooManyRequests,
} from '@/mock/data/errorResponse';
import {
  MOCK_RESAS_API_KEY,
  MOCK_NO_RESPONSE,
  MOCK_BAD_REQUEST,
  MOCK_TOO_MANY_REQUESTS,
  MOCK_NOT_ALL_POPULATION,
} from '@/mock/constants';

// DUMMY_REQUEST を使うものは擬似的な分岐

type Resolver = Parameters<HttpRequestHandler>[1];

export const mockPrefecture: Resolver = ({ request }) => {
  if (process.env.DUMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return HttpResponse.json(tooManyRequests, {
      status: 429,
    });
  }

  if (request.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return HttpResponse.json(forbidden);
  }

  if (process.env.DUMMY_REQUEST === MOCK_NO_RESPONSE) {
    return HttpResponse.json({});
  } else {
    return HttpResponse.json(prefectures);
  }
};

export const mockPopulation: Resolver = ({ request }) => {
  if (process.env.DUMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return HttpResponse.json(tooManyRequests, {
      status: 429,
    });
  }

  if (request.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return HttpResponse.json(forbidden);
  }
  request;

  const url = new URL(request.url);
  const prefCode = url.searchParams.get('prefCode');
  const cityCode = url.searchParams.get('cityCode');
  if (
    !(prefCode && cityCode) ||
    process.env.DUMMY_REQUEST === MOCK_BAD_REQUEST
  ) {
    return HttpResponse.json(badRequest);
  }

  if (process.env.DUMMY_REQUEST === MOCK_NO_RESPONSE) {
    return HttpResponse.json({});
  } else if (process.env.DUMMY_REQUEST === MOCK_NOT_ALL_POPULATION) {
    let dummyData = { ...populationCategoriesA };
    dummyData.result = {
      boundaryYear: dummyData.result?.boundaryYear ?? 2012,
      data: dummyData.result?.data.filter((d) => d.label !== '総人口') ?? [],
    };
    return HttpResponse.json(dummyData);
  } else {
    return HttpResponse.json(populationCategoriesA);
  }
};
