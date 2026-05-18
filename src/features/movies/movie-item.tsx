import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item';
import { tmdbImgPath } from '@/features/movies/movies.api';
import type { Movie } from '@/features/movies/movies.types';

type MovieItemProps = {
  movie: Movie;
};

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Item variant="outline" className="w-full">
      <ItemHeader>
        <img src={tmdbImgPath(movie.poster_path)} alt={movie.title} />
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
  );
}
