// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { TweetBody } from '../../type';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TweetBody = JSON.parse(req.body);

  const mutation = {
    mutations: [
      {
        create: {
          _type: 'tweet',
          text: data.text,
          userName: data.userName,
          blockTweet: false,
          profileImg: data.profileImg,
          image: data.image,
        },
      },
    ],
  };

  const apiEndPoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndPoint, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutation),
    method: 'POST',
  });

  const json = await result.json();

  res.status(200).json({ message: 'Add Tweet!!' });
}
