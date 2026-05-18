import { createFileRoute } from '@tanstack/react-router';

import { trendingQueryOptions } from '@/features/movies/movies.queries';
import MoviesPage from '@/pages/movies.page';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(trendingQueryOptions),
  component: MoviesPage,
});
