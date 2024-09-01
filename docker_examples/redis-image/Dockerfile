# Use an existing docker image
FROM alpine

# Download and install dependency
RUN apk add --update redis
RUN apk add --update gcc

# Image startup command
CMD ["redis-server"]