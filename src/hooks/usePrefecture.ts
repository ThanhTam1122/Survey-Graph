import { useState, useEffect } from 'react';
import { Prefectures } from '@/models/Prefecture';
import getPrefectures from '@/domains/getPrefectures';

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefectures | undefined>(
    undefined
  );

  useEffect(() => {
    getPrefectures().then((data) => setPrefectures(data));
  }, []);

  return { prefectures };
};

export default usePrefecture;
