#!/bin/sh
set -e

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "Running database migrations..."
  npm run migrate
fi

if [ "${SEED_SAMPLE_DATA}" = "true" ]; then
  echo "Seeding database with sample data..."
  npm run seed
fi

exec "$@"
