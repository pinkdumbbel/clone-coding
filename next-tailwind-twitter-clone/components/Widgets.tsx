import { SearchIcon } from '@heroicons/react/outline';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

import React from 'react';

function Widgets() {
  return (
    <div className="mt-2 px-2 col-span-2 hidden lg:inline-block border-l border-gray-100 max-h-screen">
      <div className="flex items-center mt-2 space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="w-5 h-5 text-gray-400" />
        <input
          placeholder="Search Twitter"
          className="bg-transparent outline-none flex-1"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="SonnySangha"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
