import { useQuery } from '@tanstack/react-query';

import { ItemGroup } from '@/components/ui/item';
import MovieItem from '@/features/movies/movie-item';
import { trendingQueryOptions } from '@/features/movies/movies.queries';

export function Trending() {
  const { data: trendingMovies } = useQuery(trendingQueryOptions);

  return (
    <ItemGroup className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trendingMovies?.results.map((tm) => (
        <MovieItem key={tm.id} movie={tm} />
      ))}
    </ItemGroup>
  );
}
