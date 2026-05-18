import { createFileRoute } from '@tanstack/react-router';

import { fetchMovieByIdQueryOptions } from '@/api/movies.queries';
import MovieDetailsPage from '@/pages/movie-details.page';

export const Route = createFileRoute('/movie/$movieId')({
  loader: ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(fetchMovieByIdQueryOptions(Number(params.movieId))),
  component: MovieDetailsPage,
});
