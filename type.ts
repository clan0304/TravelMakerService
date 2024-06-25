export interface User {
  id: string;
  email: string;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  cafeList: CafeItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CafeItem {
  id: string;
  name: string;
  address: string;
  rating: number;
  img: string;
  lat: number;
  lng: number;
  myRating?: number | null;
  comment?: string | null;
  type?: string | null;
}
