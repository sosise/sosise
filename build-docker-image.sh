#!/usr/bin/env sh

# Build app
npm run build

# Build Docker image
IMAGE="sosise:$(date +%Y-%m-%d)"

if [ "$(uname -m)" = "arm64" ]; then
    echo "Building for AMD64 on ARM..."
    docker buildx build --platform linux/amd64 -t "$IMAGE" -f docker/Dockerfile .
else
    echo "Building native image..."
    docker build -t "$IMAGE" -f docker/Dockerfile .
fi

# Show run command
echo "Run: docker run --rm --name sosise -p 10000:10000 $IMAGE"