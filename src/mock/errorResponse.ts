import {
  SimpleErrorResponse,
  MessageErrorResponse,
} from '@/models/ErrorResponse';

// レスポンスヘッダーのステータスは 200 OK
const badRequest: SimpleErrorResponse = '400';

// レスポンスヘッダーのステータスは 200 OK
const forbidden: MessageErrorResponse = {
  statusCode: '403',
  message: 'Forbidden.',
  description: '',
};

// レスポンスヘッダーのステータスは 200 OK
const notFoundSimle: SimpleErrorResponse = '404';

// レスポンスヘッダーのステータスは 200 OK
const notFound: MessageErrorResponse = {
  statusCode: '404',
  message: "404. That's an error.",
  description: 'The requested URL /404 was not found on this server.',
};

const tooManyRequests: MessageErrorResponse = {
  message: null,
};

export { badRequest, forbidden, notFoundSimle, notFound, tooManyRequests };
