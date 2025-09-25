import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { userQueries } from '@/lib/queries/user';
import { Spinner } from '@/components/ui/spinner';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { AlertTriangleIcon } from 'lucide-react';

interface RouterContext {
  queryClient: QueryClient;
  user?: Awaited<{
    id: string;
    name: string;
    email: string;
    role: "root" | "admin" | "user";
  }>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.ensureQueryData(userQueries.me())
      .catch(() => undefined); // Do nothing if query fails (probably unauthenticated)

    return { user };
  },
  component: RootComponent,
  pendingComponent: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner variant="ring" className="size-8" />
    </div>
  ),
  errorComponent: () => (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <AlertTriangleIcon className="size-16 mb-8 opacity-60 text-red-400" />
        <h3 className="text-lg">
          Oops something went wrong!
        </h3>
        <div className="mt-4 text-sm">
          Check logs or try again
        </div>
      </div>
      <Toaster />
    </>
  ),
  onError: (err) =>{
    setTimeout(() => {
      toast(err.routerCode + " | " + err.name, {
        description: err.message,
      });
    }, 256);
  },
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};
