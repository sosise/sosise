#!/usr/bin/env sh

# Variables
TAG=latest
NAME=sosise
IMAGENAME=${NAME}:${TAG}
ARCH=$(uname -m)

# Build app
npm run build

# Build and deploy based on arch
if [[ "$ARCH" == "arm64" ]]
    then
    # Build for ARM architecture
    echo "ARM architecture. Using buildx for cross-platform build."
    docker buildx build --platform linux/amd64 -t ${IMAGENAME} -f docker/Dockerfile .
else
    # Build for non-ARM architectures
    echo "Non-ARM architecture. Using standard docker build and push."
    docker build -t ${IMAGENAME} -f docker/Dockerfile .
fi

# Run container
GREEN='\033[0;32m'
NC='\033[0m'
echo "To run the container use this command: ${GREEN}docker run --rm --name sosise -p 10000:10000 ${IMAGENAME}${NC}"
