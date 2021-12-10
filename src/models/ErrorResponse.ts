export type SimpleErrorResponse = '400' | '404';

export type MessageErrorResponse = {
  statusCode?: '403' | '404';
  message: string | null;
  description?: string;
};

const isSimpleErrorResponse = (arg: unknown): arg is SimpleErrorResponse => {
  const err = arg as SimpleErrorResponse;

  return err === '400' || err === '404';
};

const isMessageErrorResponse = (arg: unknown): arg is MessageErrorResponse => {
  const err = arg as MessageErrorResponse;

  return (
    (typeof err.statusCode === 'undefined' ||
      err.statusCode === '403' ||
      err.statusCode === '404') &&
    (typeof err.message === 'string' || err.message === null) &&
    (typeof err.description === 'undefined' ||
      typeof err.description === 'string')
  );
};

export { isSimpleErrorResponse, isMessageErrorResponse };
