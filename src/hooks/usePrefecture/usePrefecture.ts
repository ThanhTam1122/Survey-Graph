import { useState, useEffect } from 'react';
import { HTTPError } from 'ky';
import { Prefectures } from '@/models/Prefecture';
import getPrefectures from '@/domains/getPrefectures';

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefectures | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    getPrefectures()
      .then((data) => {
        setPrefectures(data);
        setErrorMessage('');
      })
      .catch((err) => {
        if (err instanceof HTTPError) {
          setErrorMessage(
            '都道府県データの取得に失敗しました。お手数ですが、お時間経過後に再度お試しください。'
          );
        } else if (err instanceof Error) {
          setErrorMessage('想定しない都道府県データが取得されました。');
        } else {
          console.error(err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { prefectures, isLoading, errorMessage };
};

export default usePrefecture;
