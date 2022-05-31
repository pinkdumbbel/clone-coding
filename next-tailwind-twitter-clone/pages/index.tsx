import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { fetchTweets } from '../api/fetchTweets';
import Feed from '../components/Feed';
import SideBar from '../components/SideBar';
import Widgets from '../components/Widgets';
import { Tweet } from '../type';

interface Props {
  tweets: Tweet[];
}
const Home: NextPage<Props> = ({ tweets }) => {
  return (
    <div className="lg:max-w-6xl mx-auto max-h-screen">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9">
        <SideBar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const tweets = await fetchTweets();
  return {
    props: {
      tweets,
    },
  };
};
