FROM alpine:3

ENV ANALYZER_VERSION=6.6 \
    ANALYZER_USER=1000

WORKDIR /tmp
RUN adduser --uid ${ANALYZER_USER} apacheuser || :

RUN apk add --no-cache tzdata make perl \
  && cp /usr/share/zoneinfo/Asia/Nicosia /etc/localtime \
  && echo "Asia/Nicosia" >  /etc/timezone \
  && apk del tzdata
RUN wget -q https://sourceforge.net/projects/squid-report/files/squid-report/${ANALYZER_VERSION}/squidanalyzer-${ANALYZER_VERSION}.tar.gz/download -O squidanalyzer-${ANALYZER_VERSION}.tar.gz
RUN tar -xzf squidanalyzer-${ANALYZER_VERSION}.tar.gz
WORKDIR /tmp/squidanalyzer-${ANALYZER_VERSION}
RUN perl Makefile.PL \
                    LOGFILE=/var/squid/logs/access.log \
                    BINDIR=/usr/local/bin \
                    CONFDIR=/etc \
                    HTMLDIR=/usr/local/apache2/htdocs/ \
                    BASEURL=/ \
                    MANDIR=/usr/share/man/man3 \
                    DOCDIR=/usr/share/doc/squidanalyzer \
  && make \
	&& make install \
  && chown ${ANALYZER_USER}:${ANALYZER_USER} /usr/local/bin/squid-analyzer \
  && chmod +s /usr/local/bin/squid-analyzer \
  && /usr/local/bin/squid-analyzer -r

WORKDIR /etc/periodic/15min
RUN echo "#!/bin/sh" > squid-analyzer \
    && echo "echo -n \"Running squid-analyzer...\"" >> squid-analyzer \
    && echo "/usr/local/bin/squid-analyzer -d 2> /var/squid/logs/analyzer.log" >> squid-analyzer \
    && echo "echo Done" >> squid-analyzer \
    && chmod +x squid-analyzer
WORKDIR /usr/local/bin
RUN echo "#!/bin/sh" > copyhtml.sh \
    && echo "chown -Rc ${ANALYZER_USER}:${ANALYZER_USER} /usr/local/apache2/htdocs" >> copyhtml.sh \
    && echo "cp -avu /usr/local/apache2/htdocs/* /htdocs/" >> copyhtml.sh \
    && echo "rm -rfv /usr/local/apache2/htdocs" >> copyhtml.sh \
    && echo "ln -s /htdocs /usr/local/apache2/htdocs" >> copyhtml.sh \
    && echo "chown -Rc ${ANALYZER_USER}:${ANALYZER_USER} /htdocs" >> copyhtml.sh \
    && echo "crond -f -l 7" >> copyhtml.sh \
    && chmod +x copyhtml.sh

#/usr/local/apache2/htdocs/
RUN squid-analyzer -r

#ENTRYPOINT [ "crond", "-L /var/squid/logs/cron.log" ]

