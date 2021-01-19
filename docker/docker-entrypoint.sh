#!/usr/bin/env sh
set -e

if [ $# -gt 0 ]
then
    exec "$@"
else
    # Run migrations, if it fails, do not stop
    node build/artisan.js migrate || true

    # Execute supervisord
    exec /usr/bin/supervisord -c /etc/supervisord.conf
fi
