import { Options } from 'ky';

export const DEFAULT_API_OPTIONS: Options = {
  prefixUrl: 'https://opendata.resas-portal.go.jp/api/v1',
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set(
          'X-API-KEY',
          process.env.NEXT_PUBLIC_RESAS_API_KEY ?? 'Not API Key'
        );
      },
    ],
  },
};
