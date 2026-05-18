import { Link } from '@tanstack/react-router';

import { tmdbImgPath } from '@/api/movies.api';
import { Item, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item';
import type { Movie } from '@/types/movies.types';

type MovieItemProps = {
  movie: Movie;
};

export default function MovieItem({ movie }: MovieItemProps) {
  return (
    <Link to="/movie/$movieId" params={{ movieId: movie.id.toString() }}>
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
    </Link>
  );
}
