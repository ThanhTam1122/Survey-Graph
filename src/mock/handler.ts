import { rest } from 'msw';
import { mockPrefecture, mockPopulation } from './api/resas';
import { API_URL } from '@/config/ky';

export const handlers = [
  rest.get(`${API_URL}/prefectures`, mockPrefecture),
  rest.get(`${API_URL}/population/composition/perYear`, mockPopulation),
];
