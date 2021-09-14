#!/usr/bin/env sh

# Variables
TAG=latest
NAME=sosise
IMAGENAME=${NAME}:${TAG}

# Build app
npm run build

# Build docker image
docker build -t ${IMAGENAME} -f docker/Dockerfile .

# Run container
GREEN='\033[0;32m'
NC='\033[0m'
echo "To run the container use this command: ${GREEN}docker run --rm --name sosise -p 10000:10000 ${IMAGENAME}${NC}"
