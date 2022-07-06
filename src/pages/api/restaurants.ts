// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@lib/firebase';
import { collection, getDocs } from 'firebase/firestore/lite';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Restaurant = {
  name: string;
  point: number;
  link: {
    mangpl?: string;
    naver?: string;
  };
  latLng: {
    lat: number;
    lng: number;
  };
  emoji?: string;
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
