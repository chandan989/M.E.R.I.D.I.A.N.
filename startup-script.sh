#!/bin/bash

# Give the VM a few seconds to finish initializing
sleep 10

# Authenticate Docker with Google Artifact Registry
# The --project flag ensures it looks in the right project
gcloud auth configure-docker asia-northeast1-docker.pkg.dev --project=model-coral-286214

# Run the Docker container
# This pulls the image and runs it with the correct port mappings
docker run -d --name did-dht-server \
  --restart=always \
  -p 8305:8305/tcp \
  -p 6881:6881/udp \
  asia-northeast1-docker.pkg.dev/model-coral-286214/web5/did-dht