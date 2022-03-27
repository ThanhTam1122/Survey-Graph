import { Options, NormalizedOptions } from 'ky';
import {
  isSimpleErrorResponse,
  isMessageErrorResponse,
} from '@/models/ErrorResponse';

export const API_URL = 'https://opendata.resas-portal.go.jp/api/v1';

export const DEFAULT_API_OPTIONS: Options = {
  prefixUrl: API_URL,
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
    afterResponse: [
      async (
        _request: Request,
        _options: NormalizedOptions,
        response: Response
      ): Promise<Response> => {
        const { headers, status, statusText } = response;
        let init = { headers, status, statusText };
        const data = await response.json();

        // RESAS API はエラー時にもヘッダーのステータスコードが200で返ってくることがあるので、詰めなおす
        // 400, 404（レスポンスボディがステータスコードだけの場合）
        if (isSimpleErrorResponse(data)) {
          init = { headers, status: parseInt(data), statusText: '' };
        }

        // 403, 404の場合
        if (isMessageErrorResponse(data)) {
          init = {
            headers,
            status: data.statusCode ? parseInt(data.statusCode) : status,
            statusText: data.message ? data.message : '',
          };
        }

        const body = Buffer.from(JSON.stringify(data, null, 2), 'utf8');
        return new Response(body, init);
      },
    ],
  },
};
