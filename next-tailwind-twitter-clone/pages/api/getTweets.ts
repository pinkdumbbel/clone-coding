// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Tweet } from '../../type';
import { groq } from 'next-sanity';
import { sanityClient } from '../../sanity';

const feedQuery = groq`
*[_type=="tweet" && !blockTweet] {
    _id,
    ...
  } | order(_updatedAt desc)
`;
type Data = {
  tweets: Tweet[];
};

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ tweets });
}
