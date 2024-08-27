#!/bin/bash

docker compose up -d

npm run test:db:sync
npm run test && docker compose down
