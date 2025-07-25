FROM denoland/deno:alpine

WORKDIR /app

# Copy deno configuration
COPY deno.json* deno.lock* ./

# Copy entrypoint
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Copy source code
COPY . .

# Cache dependencies
RUN deno install
RUN deno cache main.ts

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]