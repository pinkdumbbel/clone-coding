import React, { ReactNode, useEffect, useState } from 'react';
import { Comment, Tweet } from '../type';
import ReactTimeAgo from 'react-time-ago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import fetchComment from '../api/fetchComment';
import CommentComponent from './Comment';
interface TweetProps {
  tweet: Tweet;
}
function Tweet({ tweet }: TweetProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  const refreshComment = async () => {
    const comments: Comment[] = await fetchComment(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComment();
  }, []);

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          src={tweet.profileImg}
          alt=""
          className="h-10 w-10 object-cover rounded-full"
        />

        <div>
          <div className="flex space-x-1 items-center">
            <p className="mr-1 font-bold">{tweet.userName}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.userName.replace(/\s+/g, ' ').toLowerCase()}
            </p>

            <ReactTimeAgo
              date={new Date(tweet._createdAt)}
              className="text-sm text-gray-500"
            />
          </div>
          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              src={tweet.image}
              alt=""
              className="m-5 ml-0 mb-1 object-cover rounded-lg shadow-sm"
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-7 text-gray-400">
        <div className="cursor-pointer flex items-center space-x-3">
          <ChatAlt2Icon className="w-5 h-5 " />
          <p>5</p>
        </div>

        <div className="cursor-pointer flex items-center space-x-3">
          <SwitchHorizontalIcon className="w-5 h-5" />
        </div>

        <div className="cursor-pointer flex items-center space-x-3">
          <HeartIcon className="w-5 h-5" />
        </div>

        <div className="cursor-pointer flex items-center space-x-3">
          <UploadIcon className="w-5 h-5" />
        </div>
      </div>

      <CommentComponent comments={comments} />
    </div>
  );
}

export default Tweet;
