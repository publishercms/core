import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Header } from '@/components/sections/header';
import { NavigationMenu } from '@/components/sections/navigation-menu';

export const Route = createFileRoute('/(dashboard)/_authenticated')({
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
  return (
    <>
      <div className="flex gap-16">
        <div className="p-8">
          <h3 className="my-1" style={{ fontFamily: "Times New Roman" }}>
            PublisherCMS
          </h3>

          <div className="mt-10">
            <NavigationMenu />
          </div>
        </div>

        <div className="p-8 flex-1 overflow-auto max-h-full h-screen">
          <Header />

          <main className="mt-8">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
