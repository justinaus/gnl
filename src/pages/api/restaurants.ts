// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs } from 'firebase/firestore/lite';
import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../firebase';

type Data = {
  name: string;
  point: number;
  link: {
    mangpl: string;
    naver: string;
  };
};

export type Response = {
  data: Data[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const restaurantsCol = collection(db, 'restaurants');

  const restaurantsSnapshot = await getDocs(restaurantsCol);
  const list = restaurantsSnapshot.docs.map((doc) => doc.data()) as Data[];

  res.status(200).json({ data: list });
}
