import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  // sample loader that prefetches the query data for the route
  // loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(sQueryOptions),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /!</div>;
}
