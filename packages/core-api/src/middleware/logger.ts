export async function loggerMiddleware(req: Request, res: Response): Promise<Response> {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = new URL(req.url);
  const path = url.pathname;
  console.log(`[${timestamp}] ${method} ${path}`);

  return res;
}
