FROM node:24-alpine

WORKDIR /app

# Install deps (only once unless package.json changes)
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
    elif [ -f package-lock.json ]; then npm ci; \
    else npm install; \
    fi

EXPOSE 8002

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8002"]
