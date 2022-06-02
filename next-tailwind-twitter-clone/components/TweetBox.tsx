import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { MouseEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTweets } from '../api/fetchTweets';
import { Tweet, TweetBody } from '../type';

interface TweetBoxProps {
  setTweets: (tweets: Tweet[]) => void;
}

function TweetBox({ setTweets }: TweetBoxProps) {
  const [input, setInput] = useState<string>('');
  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const { data: session } = useSession();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;

    setImageUrl(imageInputRef.current?.value);

    imageInputRef.current.value = '';
    setImageUrlBoxIsOpen(false);
  };

  const postTweet = async () => {
    const tweet: TweetBody = {
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      text: input,
      userName: session?.user?.name || 'Unknown User',
      image: imageUrl,
    };

    const res = await fetch('/api/addTweet', {
      body: JSON.stringify(tweet),
      method: 'POST',
    });

    const json = await res.json();

    const newTweets = await fetchTweets();

    setTweets(newTweets);

    toast.success('Added Tweet!!', {
      icon: '🚀',
    });
    return json;
  };

  const addTweet = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    postTweet();

    setInput('');
    setImageUrlBoxIsOpen(false);
    setImageUrl('');
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 rounded-full object-cover mt-4"
        src={session?.user?.image || 'https://links.papareact.com/gll'}
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
              <PhotographIcon
                className="h-5 w-5 cursor-pointer transition-transform duration-150 hover:scale-150 ease-out"
                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
              />
              <SearchCircleIcon className="h-5 w-5" />
              <EmojiHappyIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <LocationMarkerIcon className="h-5 w-5" />
            </div>
            <button
              className="bg-twitter rounded-full font-bold text-white py-3 px-5 disabled:opacity-40"
              disabled={!input || !session}
              onClick={addTweet}
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxIsOpen && (
            <div className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                placeholder="Enter Image Url..."
                className="outline-none flex-1 bg-transparent p-2 text-white placeholder:text-white"
              />
              <button className="font-bold text-white" onClick={addImage}>
                Add Image
              </button>
            </div>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              className="mt-10 h-40 w-full rounded-xl shadow-lg "
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
