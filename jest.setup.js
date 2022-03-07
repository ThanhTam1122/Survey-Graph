import '@testing-library/jest-dom/extend-expect';

const fetch = require('node-fetch');

globalThis.fetch = fetch;
globalThis.Request = fetch.Request;
globalThis.Headers = fetch.Headers;
globalThis.Response = fetch.Response;
