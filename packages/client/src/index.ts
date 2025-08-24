import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export function createClient(config: { apiUrl: string }) {
  return createTRPCProxyClient<any>({
    links: [
      httpBatchLink({
        url: config.apiUrl + "/trpc",
      }),
    ],
  });
};
