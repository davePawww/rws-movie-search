import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Movie, MovieStore } from '@/types/movies.types';

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query, page: 1 }),
      page: 1,
      setPage: (page) => set({ page }),
      favorites: [],
      addToFavorites: (movie: Movie) =>
        set((state) => ({ favorites: [movie, ...state.favorites] })),
      removeFromFavorites: (id: number) =>
        set((state) => ({ favorites: state.favorites.filter((m) => m.id !== id) })),
    }),
    {
      name: 'movie-store',
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    },
  ),
);
