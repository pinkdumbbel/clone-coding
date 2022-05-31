export interface TweetBody {
  text: string;
  userName: string;
  profileImg: string;
  image?: string;
}

export interface Tweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updateAt: string;
  _rev: string;
  _type: 'tweet';
  blockTweet: boolean;
}

export interface CommentBody {
  comment: string;
  userName: string;
  profileImg: string;
  tweetId: string;
}

export interface Comment extends CommentBody {
  _id: string;
  _createdAt: string;
  _updateAt: string;
  _rev: string;
  _type: 'comment';
  tweet: {
    _ref: string;
    _type: 'reference';
  };
}
