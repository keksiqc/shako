# Build stage
FROM oven/bun:1.3-alpine@sha256:32f1fcccb1523960b254c4f80973bee1a910d60be000a45c20c9129a1efcffee AS builder

# Add build arguments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy package files first
COPY package.json bun.lock ./

# Install dependencies with specific flags for production
RUN bun install --frozen-lockfile

# Copy only necessary source files
COPY src/ ./src/
COPY public/ ./public/
COPY shako.config.ts ./
COPY astro.config.ts ./
COPY tsconfig.json ./

# Build the application
RUN bun run build

# Production stage
FROM 11notes/caddy:2.10.0@sha256:d3739d44070d9eb0f0c09d8a207ba124553abc385f31c6278ba657d50f969113

# Copy built assets from builder
COPY --from=builder /app/dist /caddy/var/
COPY ./docker/default.json /caddy/etc/default.json

# Expose port
EXPOSE 80 443

# Start Caddy
ENTRYPOINT ["/usr/local/bin/caddy"]
CMD ["run", "--config", "/caddy/etc/default.json"]
