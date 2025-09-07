#!/bin/sh
set -e

echo "Waiting for Postgres to be ready..."

# Wait until Postgres is reachable
until pg_isready -h postgres -p 5432 -U postgres; do
  sleep 1
done

echo "Postgres is up! Running Prisma migrations..."

# Run migrations
pnpm migrate

echo "Starting the service..."
# Start the container's default service
exec "$@"