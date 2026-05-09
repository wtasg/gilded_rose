#!/bin/sh
echo "This script intentionally relies on docker compose service races."
docker compose up --build
