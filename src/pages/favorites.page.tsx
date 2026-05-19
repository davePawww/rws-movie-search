import MovieItem from '@/components/movie-item';
import { ItemGroup } from '@/components/ui/item';
import { useMovieStore } from '@/store/movie.store';

export default function FavoritesPage() {
  const favorites = useMovieStore((s) => s.favorites);

  return (
    <ItemGroup className="mt-3 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((f) => (
        <MovieItem key={f.id} movie={f} />
      ))}
    </ItemGroup>
  );
}
