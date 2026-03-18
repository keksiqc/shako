# Build stage
FROM oven/bun:1.3-alpine@sha256:7ed9f74c326d1c260abe247ac423ccbf5ac92af62bb442d515d1f92f21e8ea9b AS builder

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
FROM 11notes/caddy:2.11.2@sha256:aef39d8634d6c3bb62c021e3ead0d6d753614296cb04f6b831291ca5c2449aa0

# Copy built assets from builder
COPY --from=builder /app/dist /caddy/var/
COPY ./docker/default.json /caddy/etc/default.json

# Expose port
EXPOSE 80 443

# Start Caddy
ENTRYPOINT ["/usr/local/bin/caddy"]
CMD ["run", "--config", "/caddy/etc/default.json"]
