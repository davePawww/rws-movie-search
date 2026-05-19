import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import FavoritesPage from '@/pages/favorites.page';
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

const meta = {
  title: 'Favorites Page',
  component: FavoritesPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({ component: Story });
      const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() });
      useMovieStore.setState({ favorites: [MOCK_MOVIE] });

      return <RouterProvider router={router} />;
    },
  ],
} satisfies Meta<typeof FavoritesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = {
  decorators: [
    (Story) => {
      const rootRoute = createRootRoute({ component: Story });
      const router = createRouter({ routeTree: rootRoute, history: createMemoryHistory() });
      useMovieStore.setState({ favorites: [] });

      return <RouterProvider router={router} />;
    },
  ],
};
