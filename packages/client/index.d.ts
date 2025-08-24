import type { TRPCClient } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";

export type PublisherClient<TRouter extends AnyRouter = AnyRouter> = TRPCClient<TRouter>;

export declare function createClient<TRouter extends AnyRouter = AnyRouter>(config: {
  apiUrl: string;
}): PublisherClient<TRouter>;
