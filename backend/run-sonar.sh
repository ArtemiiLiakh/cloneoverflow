#!/bin/bash

set -a
source .env
set +a

docker run \
    --rm \
    -e SONAR_HOST_URL="http://sonarqube-server:9000"  \
    -e SONAR_TOKEN=${SONAR_TOKEN} \
    -v "./sonar-project.properties:/usr/src/sonar-project.properties" \
    -v "./src/:/usr/src/src" \
    -v "./coverage:/usr/coverage" \
    -v "./Dockerfile:/usr/src/Dockerfile" \
    --network "sonar" \
    sonarsource/sonar-scanner-cli

    