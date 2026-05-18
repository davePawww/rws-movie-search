import { queryOptions } from '@tanstack/react-query';

import { fetchTrending } from '@/features/movies/movies.api';

export const trendingQueryOptions = queryOptions({
  queryKey: ['trending'],
  queryFn: fetchTrending,
});
