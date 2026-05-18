import { ArrowLeft, ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useMovieStore } from '@/store/movie.store';

type PaginationProps = {
  page: number | undefined;
  totalPages: number | undefined;
};

export default function Pagination({ page, totalPages }: PaginationProps) {
  const setPage = useMovieStore((s) => s.setPage);

  return (
    <div className="flex items-end justify-between py-2">
      <p className="text-muted-foreground text-sm font-medium">
        Page {page} of {totalPages}
      </p>
      <ButtonGroup>
        <Button variant="secondary" disabled={page! - 1 === 0} onClick={() => setPage(page! - 1)}>
          <ArrowLeft />
        </Button>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page! + 1)}
        >
          <ArrowRight />
        </Button>
      </ButtonGroup>
    </div>
  );
}
