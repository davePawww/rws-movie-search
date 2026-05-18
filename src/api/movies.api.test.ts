import { beforeEach, describe, expect, it, vi } from 'vitest';

import { fetchTrending, searchMovies, tmdbImgPath } from '@/api/movies.api';

const mockResponse = (data: unknown, ok = true) =>
  Promise.resolve({ ok, json: () => Promise.resolve(data) } as Response);

describe('fetchTrending', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockReset();
  });

  it('calls the trending endpoint and returns data', async () => {
    const fakeData = { results: [], page: 1, total_pages: 1, total_results: 0 };
    vi.mocked(fetch).mockResolvedValue(await mockResponse(fakeData));

    const result = await fetchTrending();
    expect(result).toEqual(fakeData);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('throws on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValue(await mockResponse(null, false));
    await expect(fetchTrending()).rejects.toThrow('Failed to fetch trending');
  });
});

describe('searchMovies', () => {
  it('encodes the query in the URL', async () => {
    vi.mocked(fetch).mockResolvedValue(await mockResponse({ results: [] }));
    await searchMovies('space & beyond');
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('space & beyond')),
      expect.anything(),
    );
  });

  it('calls the search movies endpoint and returns data', async () => {
    const fakeData = { results: [], page: 1, total_pages: 1, total_results: 0 };
    vi.mocked(fetch).mockResolvedValue(await mockResponse(fakeData));

    const result = await searchMovies('harry potter');
    expect(result).toEqual(fakeData);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent('harry potter')}&include_adult=true&language=en-US`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('throws on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValue(await mockResponse(null, false));
    await expect(searchMovies('harry potter')).rejects.toThrow('Failed to fetch movies');
  });
});

describe('tmdbImgPath', () => {
  it('returns the full TMDB image URL', () => {
    expect(tmdbImgPath('/abc123.jpg')).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
  });
});
