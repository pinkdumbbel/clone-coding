import { RefreshIcon } from '@heroicons/react/outline';
import React from 'react';
import { Tweet } from '../type';
import TweetComponent from './Tweet';
import TweetBox from './TweetBox';

interface FeedProps {
  tweets: Tweet[];
}
function Feed({ tweets }: FeedProps) {
  return (
    <div className="col-span-7 lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0">Home</h1>
        <RefreshIcon className="w-8 h-8 text-twitter transition-all cursor-pointer duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      <TweetBox />

      {/* Feed */}
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
