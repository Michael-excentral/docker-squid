FROM ubuntu:18.04

ENV SQUID_VERSION=3.5.27 \
    SQUID_DIR=/usr/local/squid \
    SQUID_USER=proxy

RUN apt-get update \
    && apt-get install build-essential openssl libssl1.0-dev wget -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /tmp
RUN wget http://www.squid-cache.org/Versions/v3/3.5/squid-${SQUID_VERSION}.tar.gz
RUN tar -xzf squid-${SQUID_VERSION}.tar.gz \
    && rm squid-${SQUID_VERSION}.tar.gz
WORKDIR /tmp/squid-${SQUID_VERSION}

RUN chmod +x configure
RUN ./configure \
        --datadir=/usr/share/squid \
        --sysconfdir=/etc/squid \
        --libexecdir=/usr/lib/squid \
        --with-pidfile=/var/run/squid.pid \
        --with-filedescriptors=65536 \
        --with-large-files \
        --enable-delay-pools \
        --enable-cache-digests \
        --enable-ssl \
        --enable-ssl-crtd \
        --with-openssl \
        --enable-follow-x-forwarded-for \
        --with-default-user=${SQUID_USER}
RUN make \
    && make install

ENV PATH=$PATH:/usr/local/squid/sbin
RUN /usr/lib/squid/ssl_crtd -c -s /var/lib/ssl_db # SSL certificate database directory

RUN mkdir -p ${SQUID_DIR} \
    && chmod -R 755 ${SQUID_DIR} \
    && chown -R ${SQUID_USER}:${SQUID_USER} ${SQUID_DIR} \
    && chown -R ${SQUID_USER}:${SQUID_USER} /usr/lib/squid/ssl_crtd \
    && chown -R ${SQUID_USER}:${SQUID_USER} /var/lib/ssl_db

EXPOSE 3128/tcp

#ENTRYPOINT ["apache2ctl", "-D", "FOREGROUND"]
