import { queryOptions } from '@tanstack/react-query';

import { fetchTrending, searchMovies } from '@/api/movies.api';

export const trendingQueryOptions = queryOptions({
  queryKey: ['trending'],
  queryFn: fetchTrending,
});

export const searchQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
  });
