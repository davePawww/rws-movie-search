import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

import MovieDetailsPage from '@/pages/movie-details.page';

const meta = {
  title: 'Movie Details Page',
  component: MovieDetailsPage,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });
      const rootRoute = createRootRoute();
      const movieDetailRoute = createRoute({
        getParentRoute: () => rootRoute,
        path: '/movie/$movieId',
        component: Story,
      });
      const routeTree = rootRoute.addChildren([movieDetailRoute]);
      const router = createRouter({
        routeTree,
        history: createMemoryHistory({ initialEntries: ['/movie/550'] }),
        context: { queryClient },
      });

      return (
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof MovieDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = {
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => new Promise(() => {});
    return () => {
      globalThis.fetch = original;
    };
  },
};
export const ErrorState: Story = {
  beforeEach() {
    const original = globalThis.fetch;
    globalThis.fetch = () => Promise.reject(new Error('Network error'));
    return () => {
      globalThis.fetch = original;
    };
  },
};
