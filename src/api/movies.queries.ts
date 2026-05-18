import { queryOptions } from '@tanstack/react-query';

import { fetchMovieById, fetchTrending, searchMovies } from '@/api/movies.api';

export const trendingQueryOptions = (page: number = 1) =>
  queryOptions({
    queryKey: ['trending', page],
    queryFn: () => fetchTrending(page),
  });

export const searchQueryOptions = (query: string, page: number = 1) =>
  queryOptions({
    queryKey: ['search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.length > 0,
  });

export const fetchMovieByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieById(id),
  });
