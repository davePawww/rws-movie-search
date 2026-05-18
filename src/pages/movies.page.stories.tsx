import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import MoviesPage from '@/pages/movies.page';
import { useMovieStore } from '@/store/movie.store';
import type { Movie } from '@/types/movies.types';

const MOCK_MOVIE: Movie = {
  id: 1,
  title: 'Inception',
  overview: 'A thief who steals corporate secrets through dream-sharing technology.',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 35000,
  popularity: 100,
  original_title: 'Inception',
  original_language: 'en',
  media_type: 'movie',
  genre_ids: [28, 878],
  adult: false,
  video: false,
  genres: [],
  runtime: 120,
};
const MOCK_PAGE = { page: 1, total_pages: 1, total_results: 1, results: [MOCK_MOVIE] };
const EMPTY_PAGE = { page: 1, total_pages: 0, total_results: 0, results: [] };

// Success: pre-seed cache — query stays "fresh", no real fetch
function successClient(key: unknown[], data: object) {
  const qc = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  qc.setQueryData(key, data);
  return qc;
}

const meta = {
  title: 'Movies Page',
  component: MoviesPage,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
  decorators: [
    (Story, context) => {
      const queryClient: QueryClient =
        (context.parameters.queryClient as QueryClient | undefined) ??
        new QueryClient({ defaultOptions: { queries: { retry: false } } });

      useMovieStore.setState({ searchQuery: (context.parameters.searchQuery as string) ?? '' });

      const rootRoute = createRootRoute({ component: Story });
      const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() });

      return (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof MoviesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default (already exists — will hit real API; seed it instead)
export const TrendingWithResults: Story = {
  parameters: { queryClient: successClient(['trending'], MOCK_PAGE) },
};

export const TrendingLoading: Story = {
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => new Promise(() => {}); // never resolves
    return () => {
      globalThis.fetch = original;
    };
  },
};

export const TrendingError: Story = {
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => Promise.reject(new Error('Network error'));
    return () => {
      globalThis.fetch = original;
    };
  },
};

export const TrendingEmpty: Story = {
  parameters: { queryClient: successClient(['trending'], EMPTY_PAGE) },
};

// ---- Searching states (set searchQuery so isSearching = true) ----
const SEARCH_TERM = 'batman';

export const SearchWithResults: Story = {
  parameters: {
    searchQuery: SEARCH_TERM,
    queryClient: successClient(['search', SEARCH_TERM], MOCK_PAGE),
  },
};

export const SearchLoading: Story = {
  parameters: { searchQuery: SEARCH_TERM },
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => new Promise(() => {});
    return () => {
      globalThis.fetch = original;
    };
  },
};

export const SearchError: Story = {
  parameters: { searchQuery: SEARCH_TERM },
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => Promise.reject(new Error('Network error'));
    return () => {
      globalThis.fetch = original;
    };
  },
};

export const SearchEmpty: Story = {
  parameters: {
    searchQuery: SEARCH_TERM,
    queryClient: successClient(['search', SEARCH_TERM], EMPTY_PAGE),
  },
};
