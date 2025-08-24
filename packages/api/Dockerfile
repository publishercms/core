FROM node:24-alpine

WORKDIR /app

# Copy package configuration
COPY package.json package-lock.json ./

# Copy entrypoint
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Copy source code
COPY . .

# Install dependencies
RUN npm ci

EXPOSE 8000

ENTRYPOINT ["sh", "./entrypoint.sh"]