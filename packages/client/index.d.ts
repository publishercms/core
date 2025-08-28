import type { TRPCClient } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";

export type PublisherClient<TRouter extends AnyRouter = AnyRouter> = {
  trpc: TRPCClient<TRouter>
  user: {
    login: (values: {
      email: string;
      password: string;
    }) => Promise<string | undefined>;
  },
};

export declare function createClient<TRouter extends AnyRouter = AnyRouter>(config: {
  apiUrl: string;
}): PublisherClient<TRouter>;
