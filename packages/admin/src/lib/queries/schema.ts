
import { client } from "../client";
import { queryOptions } from "@tanstack/react-query";

export const schemaQueries = {
  postTypes: () => queryOptions({
    queryKey: ['schema', 'postTypes'],
    queryFn: () => client.trpc.schema.list.query({
      schemaType: "postType",
    }).then((values) => values.filter((value) => value.$type === "cms.postType")), // Type assertion
    staleTime: 1000 * 60 * 10, // 10 minutes
  }),

  contentBlocks: () => queryOptions({
    queryKey: ['schema', 'contentBlocks'],
    queryFn: () => client.trpc.schema.list.query({
      schemaType: "contentBlock",
    }).then((values) => values.filter((value) => value.$type === "cms.contentBlock")), // Type assertion
    staleTime: 1000 * 60 * 10, // 10 minutes
  }),
};
