#!/bin/sh
set -e

echo "Starting publishercms/core/core-api"

# Run database migration task
# npm run db:migrate

echo "~~ ############### ~~";

npx ts-node generateClientTypes.ts

# Start the application
exec npm start