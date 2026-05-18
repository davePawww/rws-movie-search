import MovieItem from '@/components/movie-item';
import { ItemGroup } from '@/components/ui/item';
import type { Movie, PaginatedResponse } from '@/types/movies.types';

type MovieListProps = {
  movies: PaginatedResponse<Movie> | undefined;
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ItemGroup className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {movies?.results.map((m) => (
        <MovieItem key={m.id} movie={m} />
      ))}
    </ItemGroup>
  );
}
