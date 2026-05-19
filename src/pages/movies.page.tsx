import { useQuery } from '@tanstack/react-query';
import { SortAscIcon, SortDescIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { searchQueryOptions, trendingQueryOptions } from '@/api/movies.queries';
import MovieList from '@/components/movie-list';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { useMovieStore } from '@/store/movie.store';

export default function MoviesPage() {
  const searchQuery = useMovieStore((s) => s.searchQuery);
  const page = useMovieStore((s) => s.page);
  const [sortBy, setSortBy] = useState('none');
  const isSearching = searchQuery.length > 0;

  const trendingQuery = useQuery(trendingQueryOptions(page));
  const searchQueryResult = useQuery(searchQueryOptions(searchQuery, page));

  const activeQuery = isSearching ? searchQueryResult : trendingQuery;
  const { data, isLoading, isError } = activeQuery;

  const sortedData = useMemo(() => {
    if (!data?.results) return data;
    if (sortBy === 'none') return data;
    return {
      ...data,
      results: [...data.results].sort((a, b) =>
        sortBy === 'asc' ? a.vote_average - b.vote_average : b.vote_average - a.vote_average,
      ),
    };
  }, [data, sortBy]);

  if (isLoading)
    return <p>{isSearching ? `Searching for "${searchQuery}"` : 'Loading trending movies.'}</p>;

  if (isError)
    return (
      <p>
        {isSearching
          ? 'Search failed. Please try again.'
          : 'Failed to load trending movies. Please try again.'}
      </p>
    );

  if (data?.results.length === 0)
    return (
      <p>
        {isSearching ? `No results found for "${searchQuery}` : 'No trending movies at the moment.'}
      </p>
    );

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <p className="text-muted-foreground text-sm">Sort by Rating</p>
        <Button
          variant="outline"
          onClick={() => {
            setSortBy((prev) => {
              if (prev === 'none') return 'asc';
              if (prev === 'asc') return 'desc';
              return 'none';
            });
          }}
        >
          {sortBy === 'none' && <span>—</span>}
          {sortBy === 'asc' && <SortAscIcon />}
          {sortBy === 'desc' && <SortDescIcon />}
        </Button>
      </div>
      <MovieList movies={sortedData} />
      <Pagination page={data?.page} totalPages={data?.total_pages} />
    </>
  );
}
