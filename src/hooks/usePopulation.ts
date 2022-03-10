import { ChangeEvent, useState, useCallback, useReducer } from 'react';
import { SeriesOptionsType } from 'highcharts';
import { HTTPError } from 'ky';
import { PopulationCategory } from '@/models/Population';
import getPopulations from '@/domains/getPopulations';

const ADD_POPULATION = 'ADD_POPULATION';
const REMOVE_POPULATION = 'REMOVE_POPULATION';

type Action = {
  type: string;
  prefName: string;
  payload?: PopulationCategory;
};

const initialState: SeriesOptionsType[] = [];

const reducer = (state: SeriesOptionsType[], action: Action) => {
  switch (action.type) {
    case ADD_POPULATION:
      const population: SeriesOptionsType = {
        type: 'line',
        name: action.prefName,
        data: action.payload?.data.map((d) => [d.year, d.value]),
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePrefectureCheck = useCallback(
    (prefCode: number, prefName: string) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          setIsLoading(true);
          getPopulations({ searchParams: { prefCode, cityCode: '-' } })
            .then((data) => {
              const totalPopulation = data.result?.data.find(
                (category) => category.label === '総人口'
              );
              // データ取得できても、総人口データがない時はエラーにする
              if (totalPopulation === undefined) {
                throw new Error('Not TotalPopulation Data');
              }
              dispatch({
                type: ADD_POPULATION,
                prefName,
                payload: totalPopulation,
              });
              setErrorMessage('');
            })
            .catch((err) => {
              if (err instanceof HTTPError) {
                setErrorMessage(
                  `${prefName}の人口遷移データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。`
                );
              } else if (err instanceof Error) {
                setErrorMessage('想定しない人口遷移データが取得されました。');
              } else {
                console.error(err);
              }
            })
            .finally(() => {
              setIsLoading(false);
            });
        } else {
          dispatch({ type: REMOVE_POPULATION, prefName });
        }
      },
    []
  );

  const handleResetError = useCallback(() => {
    setErrorMessage('');
  }, []);

  return {
    populations: state,
    isLoading,
    errorMessage,
    handlePrefectureCheck,
    handleResetError,
  };
};

export default usePopulation;
