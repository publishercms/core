#!/bin/sh
set -e

echo "Starting publishercms/core/core-api"

# Run database migration task
deno task db:migrate

echo "~~ ############### ~~";

# Start the Deno application
exec deno run --allow-net --allow-env --allow-read main.ts