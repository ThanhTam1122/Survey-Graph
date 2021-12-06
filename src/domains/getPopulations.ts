import ky, { Options } from 'ky';
import { DEFAULT_API_OPTIONS } from '@/config/ky';
import {
  PopulationCategories,
  isPopulationCategoies,
} from '@/models/Population';

type QueryParam = {
  prefCode: number;
  cityCode: string;
  addArea?: string;
};

const getPopulations = async (
  options?: Options & { searchParams?: QueryParam }
): Promise<PopulationCategories> => {
  const mergedOptions = {
    ...DEFAULT_API_OPTIONS,
    ...options,
  };
  const response = await ky.get(
    'population/composition/perYear',
    mergedOptions
  );
  const populations = (await response.json()) as unknown[];

  if (!isPopulationCategoies(populations)) {
    throw Error('API type error');
  }

  return populations;
};

export default getPopulations;
