import { describe, expect, it } from 'vitest';

import { useMovieStore } from '@/store/movie.store';

describe('useMovieStore', () => {
  it('updates the searchQuery state', () => {
    useMovieStore.getState().setSearchQuery('test');

    expect(useMovieStore.getState().searchQuery).toBe('test');
  });
});
