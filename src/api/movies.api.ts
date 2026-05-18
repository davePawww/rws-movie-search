import type { Movie, PaginatedResponse } from '@/types/movies.types';

export const tmdbImgPath = (path: string) => `https://image.tmdb.org/t/p/w500${path}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
  },
};

export const fetchTrending = async (page: number = 1): Promise<PaginatedResponse<Movie>> => {
  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;
  const response = await fetch(url, options);

  if (!response.ok) throw new Error('Failed to fetch trending');

  return response.json() as Promise<PaginatedResponse<Movie>>;
};

export const searchMovies = async (
  query: string,
  page: number = 1,
): Promise<PaginatedResponse<Movie>> => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=true&language=en-US&page=${page}`;
  const response = await fetch(url, options);

  if (!response.ok) throw new Error('Failed to fetch movies');

  return response.json() as Promise<PaginatedResponse<Movie>>;
};
