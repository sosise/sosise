FROM alpine:3.20

# Workdirectory
WORKDIR /var/www/app

RUN \
    # Install packages
    apk add --no-cache \
    nodejs-current npm tzdata supervisor dcron && \
    # Configure timezone
    cp /usr/share/zoneinfo/Asia/Almaty /etc/localtime && \
    echo "Asia/Almaty" > /etc/timezone

# Copy supervisor config
COPY ./docker/configs/supervisord/supervisord.conf /etc/supervisord.conf

# Copy docker entrypoint
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh

# Permissions
RUN chmod +x /docker-entrypoint.sh

# Copy code base
COPY . /var/www/app

# Run entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]
