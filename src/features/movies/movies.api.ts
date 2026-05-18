import type { TrendingResponse } from '@/features/movies/movies.types';

export const tmdbImgPath = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

export const fetchTrending = async (): Promise<TrendingResponse> => {
  const url = 'https://api.themoviedb.org/3/trending/all/day?language=en-US';
  const response = await fetch(url, options);

  if (!response.ok) throw new Error('Failed to fetch trending');

  return response.json() as Promise<TrendingResponse>;
};
