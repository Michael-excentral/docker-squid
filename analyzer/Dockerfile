FROM alpine

ENV ANALYZER_VERSION=6.6 \
    ANALYZER_USER=1000

WORKDIR /tmp
RUN apk add --no-cache tzdata make perl \
  && cp /usr/share/zoneinfo/Asia/Nicosia /etc/localtime \
  && echo "Asia/Nicosia" >  /etc/timezone \
  && apk del tzdata
RUN wget https://sourceforge.net/projects/squid-report/files/squid-report/${ANALYZER_VERSION}/squidanalyzer-${ANALYZER_VERSION}.tar.gz/download -O squidanalyzer-${ANALYZER_VERSION}.tar.gz
RUN tar -xzf squidanalyzer-${ANALYZER_VERSION}.tar.gz
WORKDIR /tmp/squidanalyzer-${ANALYZER_VERSION}
RUN perl Makefile.PL \
                    LOGFILE=/var/squid/logs/access.log \
                    BINDIR=/usr/bin \
                    CONFDIR=/etc \
                    HTMLDIR=/usr/local/apache2/htdocs/ \
                    BASEURL=/ \
                    MANDIR=/usr/share/man/man3 \
                    DOCDIR=/usr/share/doc/squidanalyzer \
  && make \
	&& make install \
  && chown ${ANALYZER_USER} /usr/bin/squid-analyzer \
  && chmod +s /usr/bin/squid-analyzer \
  && squid-analyzer -r

WORKDIR /etc/periodic/15min
RUN echo "#!/bin/sh" > squid-analyzer \
    && echo squid-analyzer >> squid-analyzer \
    && chmod +x squid-analyzer
#RUN squid-analyzer -r

#ENTRYPOINT [ "crond", "-L /var/squid/logs/cron.log" ]

