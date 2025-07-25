export async function corsMiddleware(_req: Request, res: Response): Promise<Response> {
  // Add CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  for (const [key, value] of headers) {
    res.headers.set(key, value);
  }

  return res;
}
