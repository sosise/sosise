#!/usr/bin/env sh
set -e

if [ $# -gt 0 ]
then
    exec "$@"
else
    # Run migrations
    node artisan.js migrate

    # Execute supervisord
    exec /usr/bin/supervisord -c /etc/supervisord.conf
fi
