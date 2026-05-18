import { CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useMovieStore } from '@/store/movie.store';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const setSearchQuery = useMovieStore((s) => s.setSearchQuery);

  useEffect(() => {
    const tId = setTimeout(() => {
      setSearchQuery(searchInput);
    }, 500);

    return () => clearTimeout(tId);
  }, [searchInput, setSearchQuery]);

  return (
    <InputGroup className="mt-3">
      <InputGroupInput
        id="inline-end-input"
        type="text"
        placeholder="Start typing to search.."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <InputGroupAddon
        align="inline-end"
        className="cursor-pointer"
        onClick={() => setSearchInput('')}
      >
        <CircleX />
      </InputGroupAddon>
    </InputGroup>
  );
}
