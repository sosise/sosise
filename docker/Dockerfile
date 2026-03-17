# ──────────────────────────────────────
# Stage 1: Build
# ──────────────────────────────────────
FROM alpine:3.21 AS builder

WORKDIR /var/www/app

# Install Node.js LTS and npm for building
RUN apk add --no-cache nodejs npm

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies needed for TypeScript compilation)
RUN npm ci

# Copy source code and config files needed for build
COPY src/ ./src/
COPY tsconfig.json ./tsconfig.json
COPY docs/ ./docs/

# Build TypeScript to JavaScript
RUN npm run build

# ──────────────────────────────────────
# Stage 2: Production
# ──────────────────────────────────────
FROM alpine:3.21

WORKDIR /var/www/app

RUN \
    # Install runtime packages only
    apk add --no-cache nodejs npm tzdata supervisor dcron && \
    # Configure timezone
    cp /usr/share/zoneinfo/Asia/Almaty /etc/localtime && \
    echo "Asia/Almaty" > /etc/timezone

# Copy supervisor config
COPY ./docker/configs/supervisord/supervisord.conf /etc/supervisord.conf

# Copy docker entrypoint
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy built application from builder stage
COPY --from=builder /var/www/app/build ./build
COPY --from=builder /var/www/app/docs ./docs
COPY --from=builder /var/www/app/package.json ./package.json
COPY --from=builder /var/www/app/package-lock.json ./package-lock.json

# Copy artisan shell script
COPY artisan ./artisan
RUN chmod +x ./artisan

# Install production dependencies only (no TypeScript, ESLint, Jest, etc.)
RUN npm ci --omit=dev

# Create storage directories
RUN mkdir -p storage/logs storage/sessions storage/cache storage/framework

ENTRYPOINT ["/docker-entrypoint.sh"]
