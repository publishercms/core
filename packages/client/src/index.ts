import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

function setAuthToken(token: string) {
  localStorage.setItem('pubcms-token', token);
};

function getAuthToken() {
  return localStorage.getItem('pubcms-token');
};

export function createClient(config: { apiUrl: string }) {
  const trpc = createTRPCProxyClient<any>({
    links: [
      httpBatchLink({
        url: config.apiUrl + "/trpc",
        headers() {
          const token = getAuthToken();
          if (token) {
            return {
              'Authorization': `Bearer ${token}`,
            };
          }

          return {};
        }
      }),
    ],
  });

  const user = {
    login: async ({ email, password}: {
      email: string;
      password: string;
    }) => {
      const response: {
        token: string;
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
        },
      } = await (trpc as any).authentication.login.mutate({ email, password });

      if (response != null && response.token != null) {
        setAuthToken(response.token);
        return response.token;
      }

      return undefined;
    },
  };

  return {
    trpc,
    user,
  };
};
