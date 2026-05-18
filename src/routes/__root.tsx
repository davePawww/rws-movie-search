import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Container from '@/components/layout/container';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import SearchBar from '@/components/search-bar';
import { Separator } from '@/components/ui/separator';
import { useThemeSync } from '@/hooks/use-theme-sync';
import type { RouterContext } from '@/types/common.types';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  useThemeSync();

  return (
    <>
      <Container>
        <Header />
        <Content>
          <div className="bg-background sticky top-0 z-10 px-4 py-2">
            <div className="flex gap-2 pb-2">
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
              <Link to="/favorites" className="[&.active]:font-bold">
                Favorites
              </Link>
            </div>
            <Separator />
            <SearchBar />
          </div>
          <div className="px-4">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  );
}
