import { http } from 'msw';
import { mockPrefecture, mockPopulation } from './api/resas';
import { API_URL } from '@/config/ky';

export const handlers = [
  http.get(`${API_URL}/prefectures`, mockPrefecture),
  http.get(`${API_URL}/population/composition/perYear`, mockPopulation),
];
