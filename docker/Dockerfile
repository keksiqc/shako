# Build stage
FROM oven/bun:1.4-alpine@sha256:629e17411f1f129dbec3af78d5af9c9f2a937435c80349437206c6b0b7422373 AS base

FROM base AS builder
# Add build arguments
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /tmp/build

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

# Set node adapter
RUN bun run astro add node -y

# Build the application
RUN bun run build

# Production stage
FROM base AS runner

WORKDIR /app
COPY --from=builder /tmp/build/dist ./dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

USER bun

ENTRYPOINT ["bun"]
CMD ["run", "./dist/server/entry.mjs"]
