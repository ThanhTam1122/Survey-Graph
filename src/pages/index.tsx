import Head from 'next/head';
import HomePage from '@/components/page/Home';

const Home = () => {
  return (
    <div>
      <Head>
        <title>RESAS Graph App</title>
        <meta
          name="description"
          content="都道府県ごとの人口遷移グラフを表示するアプリ"
        />
      </Head>
      <HomePage />
    </div>
  );
};

export default Home;
