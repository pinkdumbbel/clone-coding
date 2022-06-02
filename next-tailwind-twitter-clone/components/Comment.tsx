import React from 'react';
import ReactTimeAgo from 'react-time-ago';
import { Comment } from '../type';

interface CommentProps {
  comments: Comment[];
}

function Comment({ comments }: CommentProps) {
  return (
    <div className="my-2 mt-5 max-h-44 space-y-5 border-t border-gray-100 p-5 overflow-y-scroll scrollbar-hide">
      {comments.length > 0 &&
        comments.map((comment) => (
          <div key={comment._id}>
            <div className="flex space-x-2 relative">
              <hr className="absolute left-5 top-10 border-l-2 border-twitter/20 h-8 " />
              <img
                src={comment.profileImg}
                alt=""
                className="mt-2 w-7 h-7 object-cover rounded-full"
              />
              <div>
                <div className="flex space-x-1">
                  <p className="font-bold">{comment.userName}</p>
                  <p className="hidden text-sm text-gray-500 sm:inline">
                    @{comment.userName.replace(/\s+/g, ' ').toLowerCase()}
                  </p>

                  <ReactTimeAgo
                    date={new Date(comment._createdAt)}
                    className="text-sm text-gray-500"
                  />
                </div>

                <div>
                  <p className="pt-0">{comment.comment}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Comment;
