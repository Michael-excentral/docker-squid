
FROM alpine

####COPY ./public-html/ /usr/local/apache2/htdocs/
RUN apk add --no-cache make perl

WORKDIR /tmp
RUN apk add --no-cache tzdata  \
  && cp /usr/share/zoneinfo/Asia/Nicosia /etc/localtime \
  && echo "Asia/Nicosia" >  /etc/timezone \
  && apk del tzdata
RUN wget https://sourceforge.net/projects/squid-report/files/squid-report/6.6/squidanalyzer-6.6.tar.gz/download -O squidanalyzer-6.6.tar.gz
RUN tar -xzf squidanalyzer-6.6.tar.gz
WORKDIR /tmp/squidanalyzer-6.6
RUN perl Makefile.PL \
                    LOGFILE=/var/squid/logs/access.log \
                    BINDIR=/usr/bin \
                    CONFDIR=/etc \
                    HTMLDIR=/usr/local/apache2/htdocs/ \
                    BASEURL=/ \
                    MANDIR=/usr/share/man/man3 \
                    DOCDIR=/usr/share/doc/squidanalyzer && \
	make && \
	make install

WORKDIR /etc/periodic/15min
RUN echo "#!/bin/sh" > squid-analyzer
RUN echo squid-analyzer >> squid-analyzer
RUN chmod +x squid-analyzer
RUN squid-analyzer -r

#ENTRYPOINT [ "crond", "-L /var/squid/logs/cron.log" ]

