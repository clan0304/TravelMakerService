import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { CafeItem } from '@/type';

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

export async function GET(req: NextRequest) {
  try {
    const userEmail = req.nextUrl.searchParams.get('userEmail');
    const radius = parseFloat(req.nextUrl.searchParams.get('radius') || '0');
    const lat = parseFloat(req.nextUrl.searchParams.get('lat') || '0');
    const lng = parseFloat(req.nextUrl.searchParams.get('lng') || '0');

    if (!userEmail) {
      return NextResponse.json(
        { message: 'Invalid userEmail' },
        { status: 400 }
      );
    }

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

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { cafeList: true },
    });

    if (!user || !user.cafeList) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const filteredList = user.cafeList.filter((cafe: CafeItem) => {
      const cafeCoords = { lat: cafe.lat, lng: cafe.lng };
      const userCoords = { lat, lng };
      const dist = haversineDistance(cafeCoords, userCoords);
      return dist <= radius / 1000;
    });

    return NextResponse.json(filteredList, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
