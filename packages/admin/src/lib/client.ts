import { createClient } from "publishercms-client";
import type { AppRouter } from "../../.publishercms/remote-types";

export const client = createClient<AppRouter>({
  apiUrl: "http://localhost:8000",
});
