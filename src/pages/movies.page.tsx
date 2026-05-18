import { useQuery } from '@tanstack/react-query';

import { searchQueryOptions, trendingQueryOptions } from '@/api/movies.queries';
import MovieList from '@/components/movie-list';
import Pagination from '@/components/pagination';
import { useMovieStore } from '@/store/movie.store';

export default function MoviesPage() {
  const searchQuery = useMovieStore((s) => s.searchQuery);
  const page = useMovieStore((s) => s.page);
  const {
    data: trendingMovies,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery(trendingQueryOptions(page));
  const {
    data: searchedMovies,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery(searchQueryOptions(searchQuery, page));

  const isSearching = searchQuery.length > 0;

  // Loading states
  if (isSearching && searchLoading) return <p>Searching for &quot;{searchQuery}&quot;…</p>;
  if (!isSearching && trendingLoading) return <p>Loading trending movies…</p>;

  // Error states
  if (isSearching && searchError) return <p>Search failed. Please try again.</p>;
  if (!isSearching && trendingError)
    return <p>Failed to load trending movies. Please try again.</p>;

  // Empty results
  if (isSearching && !searchedMovies?.results.length)
    return <p>No results found for &quot;{searchQuery}&quot;.</p>;
  if (!isSearching && !trendingMovies?.results.length)
    return <p>No trending movies at the moment.</p>;

  return (
    <>
      <MovieList movies={isSearching ? searchedMovies : trendingMovies} />
      <Pagination
        page={isSearching ? searchedMovies?.page : trendingMovies?.page}
        totalPages={isSearching ? searchedMovies?.total_pages : trendingMovies?.total_pages}
      />
    </>
  );
}
