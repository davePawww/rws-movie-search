import { Link } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';

import { tmdbImgPath } from '@/api/movies.api';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from '@/components/ui/item';
import { useMovieStore } from '@/store/movie.store';
import type { Movie } from '@/types/movies.types';

type MovieItemProps = {
  movie: Movie;
};

export default function MovieItem({ movie }: MovieItemProps) {
  const favorites = useMovieStore((s) => s.favorites);
  const addToFavorites = useMovieStore((s) => s.addToFavorites);
  const removeToFavorites = useMovieStore((s) => s.removeFromFavorites);
  const isFavorite = favorites.find((f) => f.id === movie.id);

  return (
    <Link to="/movie/$movieId" params={{ movieId: movie.id.toString() }}>
      <Item variant="outline" className="relative w-full">
        <ItemHeader>
          <img src={tmdbImgPath(movie.poster_path)} alt={movie.title} />
          <ItemActions>
            {isFavorite ? (
              <Button
                className="absolute top-5 right-5"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  removeToFavorites(movie.id);
                }}
              >
                ⭐
              </Button>
            ) : (
              <Button
                className="absolute top-5 right-5"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  addToFavorites(movie);
                }}
              >
                <StarIcon size={18} />
              </Button>
            )}
          </ItemActions>
        </ItemHeader>
        <ItemContent>
          <ItemTitle>{movie.title}</ItemTitle>
          <ItemDescription>{movie.overview}</ItemDescription>
          <div className="text-muted-foreground mt-2 flex items-center justify-between">
            <p>Released: {movie.release_date}</p>
            <p>Rating: {movie.vote_average.toFixed(2)}</p>
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
}
