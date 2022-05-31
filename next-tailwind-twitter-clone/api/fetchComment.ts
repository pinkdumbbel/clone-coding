import { Comment } from '../type';

const fetchComment = async (tweetId: string) => {
  const res = await fetch(`/api/getComments?tweetId=${tweetId}`);

  const data: Comment[] = await res.json();

  return data;
};

export default fetchComment;
