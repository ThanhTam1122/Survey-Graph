import '@testing-library/jest-dom/extend-expect';

import nodeFetch, { Request, Headers, Response } from 'node-fetch';

if (!global.fetch) {
  global.fetch = nodeFetch;
  global.Request = Request;
  global.Headers = Headers;
  global.Response = Response;
}
