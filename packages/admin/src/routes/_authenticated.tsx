import { userQueries } from '@/lib/queries/user';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { data: user } = useQuery(userQueries.me());

  return (
    <>
      <div>Hello {user?.name}!</div>
      <Outlet />
    </>
  );
}
