import { client } from "../client";
import { queryOptions } from "@tanstack/react-query";

export const userQueries = {
  me: () => queryOptions({
    queryKey: ['user', 'me'],
    queryFn: () => client.trpc.user.me.query(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  }),
};
