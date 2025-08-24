FROM node:24-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./

RUN if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install; \
    elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
    elif [ -f package-lock.json ]; then npm ci; \
    else npm install; \
    fi

# Copy rest of source code
COPY . .

# Expose Vite dev server
EXPOSE 8002

# Run Vite dev server on 0.0.0.0:8002
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8002"]
