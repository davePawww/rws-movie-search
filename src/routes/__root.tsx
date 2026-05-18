import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Container from '@/components/layout/container';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
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
          <div className="flex gap-2 p-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>
            <Link to="/about" className="[&.active]:font-bold">
              About
            </Link>
          </div>
          <hr />
          <Outlet />
        </Content>
        <Footer />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  );
}
