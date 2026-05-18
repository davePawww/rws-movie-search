import { create } from 'zustand';

import type { MovieStore } from '@/types/movies.types';

export const useMovieStore = create<MovieStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
