import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prisma';
import { CafeItem } from '@/type';
import { NextRequest } from 'next/server';

const BASE_URL =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
const GOOGLE_PLACE_KEY = process.env.GOOGLE_PLACE_API_KEY;

function haversineDistance(
  coords1: { lat: number; lng: number },
  coords2: { lat: number; lng: number },
  isMiles: boolean = false
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRad(coords2.lat - coords1.lat);
  const dLon = toRad(coords2.lng - coords1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coords1.lat)) *
      Math.cos(toRad(coords2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return isMiles ? distance / 1.60934 : distance;
}

export const GET = async (req: NextRequest, res: NextApiResponse) => {
  try {
    const { searchParams } = new URL(req.url);

    const userEmail = searchParams.get('userEmail') || '';
    const radius = parseFloat(searchParams.get('radius') || '0');
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');

    // Fetch nearby places from Google Maps API
    const response = await fetch(
      `${BASE_URL}location=${lat},${lng}&radius=${radius}&key=${GOOGLE_PLACE_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Maps API');
    }

    const placesData = await response.json();
    const googlePlaces = placesData.results || [];

    // Fetch user's cafe list from the database
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { cafeList: true },
    });

    if (!user || !userEmail || !user.cafeList) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter the user's cafe list based on the radius
    const filteredList = user.cafeList.filter((cafe: CafeItem) => {
      const cafeCoords = { lat: cafe.lat, lng: cafe.lng };
      const userCoords = { lat, lng };
      const dist = haversineDistance(cafeCoords, userCoords);
      return dist <= radius;
    });

    // Combine Google Places results with the filtered cafe list
    const combinedResults = [...filteredList, ...googlePlaces];

    return res.status(200).json(combinedResults);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
