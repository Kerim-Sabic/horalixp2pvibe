ARG GOVERSION=latest
FROM golang:$GOVERSION

LABEL org.opencontainers.image.authors="Horalix P2P Project" \
      org.opencontainers.image.url="https://horalix.com" \
      org.opencontainers.image.documentation="https://horalix.com/docs" \
      org.opencontainers.image.source="https://github.com/Kerim-Sabic/horalixp2pvibe" \
      org.opencontainers.image.vendor="Horalix P2P Project" \
      org.opencontainers.image.licenses="MPL-2.0" \
      org.opencontainers.image.title="Horalix P2P Builder"

# FPM to build Debian packages
RUN apt-get update && apt-get install -y --no-install-recommends \
	locales rubygems ruby-dev build-essential git \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/* \
	&& gem install fpm
