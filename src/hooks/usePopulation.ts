import { ChangeEvent, useCallback, useReducer } from 'react';
import { SeriesOptionsType } from 'highcharts';
import { PopulationCategories } from '@/models/Population';
import getPopulations from '@/domains/getPopulations';

const ADD_POPULATION = 'ADD_POPULATION';
const REMOVE_POPULATION = 'REMOVE_POPULATION';

type Action = {
  type: string;
  prefName: string;
  payload?: PopulationCategories;
};

const initialState: SeriesOptionsType[] = [];

const reducer = (state: SeriesOptionsType[], action: Action) => {
  switch (action.type) {
    case ADD_POPULATION:
      const totalPopulation = action.payload?.result.data.find(
        (category) => category.label === '総人口'
      );
      const population: SeriesOptionsType = {
        type: 'line',
        name: action.prefName,
        data: totalPopulation?.data.map((d) => [d.year, d.value]),
      };
      return [...state, population];
    case REMOVE_POPULATION:
      return state.filter((s) => s.name !== action.prefName);
    default:
      return state;
  }
};

const usePopulation = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handlePrefectureCheck = useCallback(
    (prefCode: number, prefName: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          getPopulations({ searchParams: { prefCode, cityCode: '-' } }).then(
            (data) =>
              dispatch({ type: ADD_POPULATION, prefName, payload: data })
          );
        } else {
          dispatch({ type: REMOVE_POPULATION, prefName });
        }
      },
    []
  );

  return { populations: state, handlePrefectureCheck };
};

export default usePopulation;
