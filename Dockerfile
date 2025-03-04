# Build stage
FROM oven/bun:alpine AS builder

# Add build arguments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy package files first
COPY package.json bun.lockb ./

# Install dependencies with specific flags for production
RUN bun install --frozen-lockfile

# Copy only necessary source files
COPY src/ ./src/
COPY public/ ./public/
COPY shako.config.ts ./
COPY astro.config.ts ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./

# Build the application
RUN bun run build

# Production stage
FROM caddy:2-alpine

# Create non-root user
RUN addgroup -S shako && \
    adduser -S -G shako -h /home/shako shako

# Copy Caddy configuration
COPY ./docker/Caddyfile /etc/caddy/Caddyfile

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/caddy/html

# Install required packages and set permissions for Caddy
RUN apk add --no-cache libcap && \
    chown -R shako:shako /usr/share/caddy && \
    chown -R shako:shako /etc/caddy && \
    chmod -R 755 /usr/share/caddy && \
    chmod -R 755 /etc/caddy && \
    setcap 'cap_net_bind_service=+ep' /usr/bin/caddy

# Switch to non-root user
USER shako

# Configure healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start Caddy
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
