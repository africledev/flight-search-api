# Use a multi-stage build for a smaller final image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy source files
COPY . .

# Build the application
RUN pnpm build

# Prune dev dependencies after the build step to remove dev dependencies.
RUN pnpm prune --prod

# Start a new stage for the runtime
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Install only the necessary runtime dependencies
RUN apk add --no-cache tini

# Copy built node modules and dist from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Set environment variables
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 8888

# Use tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# Run the application
USER node
CMD ["node", "dist/index.js"]