import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';

function TweetBox() {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src="https://links.papareact.com/gll"
        alt=""
      />

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl placeholder:text-xl outline-none"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <div className="flex items-center">
            <div className="flex space-x-2 text-twitter flex-1">
              <PhotographIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 hover:scale-150 ease-out" />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              className="bg-twitter rounded-full font-bold text-white py-3 px-5 disabled:opacity-40"
              disabled={!input}
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
