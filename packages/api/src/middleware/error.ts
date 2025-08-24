export function errorHandler(error: Error): Response {
  console.error("Error:", error);

  const isDev = true;

  return new Response(
    JSON.stringify({
      error: "Internal Server Error",
      message: isDev ? error.message : "Something went wrong",
      ...(isDev && { stack: error.stack }),
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  );
};
