// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@lib/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Restaurant = {
  id: string;
  name: string;
  naverId: string;
  latLng: {
    lat: number;
    lng: number;
  };
  link: {
    mangpl?: string;
    micherin?: string;
    blueribbon?: string;
  };
  point?: number;
  content?: string;
  emoji?: string;
  hashtags?: string[];
};

export type RestaurantsResponse = {
  data: Restaurant[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RestaurantsResponse>,
) {
  const restaurantsCol = collection(db, 'restaurants');

  const restaurantsSnapshot = await getDocs(restaurantsCol);
  const list = restaurantsSnapshot.docs.map((doc) =>
    doc.data(),
  ) as Restaurant[];

  res.status(200).json({ data: list });
}
