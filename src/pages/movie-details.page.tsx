import { useQuery } from '@tanstack/react-query';

import { tmdbImgPath } from '@/api/movies.api';
import { fetchMovieByIdQueryOptions } from '@/api/movies.queries';
import { Badge } from '@/components/ui/badge';
import { Route } from '@/routes/movie.$movieId';

export default function MovieDetailsPage() {
  const { movieId } = Route.useParams();
  const { data, isLoading, isError } = useQuery(fetchMovieByIdQueryOptions(Number(movieId)));

  if (isLoading) return <p>Loading the movie..</p>;
  if (isError) return <p>Failed to load movie details..</p>;

  return (
    <div className="my-2 space-y-2 lg:flex lg:gap-4">
      <img
        src={data?.poster_path ? tmdbImgPath(data?.poster_path) : ''}
        alt={data?.title}
        className="rounded-md md:mx-auto md:max-w-100 lg:mx-0 lg:max-w-200"
      />
      <div className="space-y-2">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{data?.title}</h4>
        <p className="text-muted-foreground text-sm">{data?.overview}</p>
        <div className="p space-x-2">
          {data?.genres.map((genre) => (
            <Badge key={genre.id} variant="outline">
              {genre.name}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">{data?.runtime} minutes</p>
        <div className="text-muted-foreground flex items-center justify-between text-sm lg:pt-8">
          <p>Release Date: {data?.release_date}</p>
          <p>Rating: {data?.vote_average.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
