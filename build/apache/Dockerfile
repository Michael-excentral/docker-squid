
FROM httpd:2.4-alpine

ENV USER=1000

RUN apk add --no-cache tzdata  \
  && cp /usr/share/zoneinfo/Asia/Nicosia /etc/localtime \
  && echo "Asia/Nicosia" >  /etc/timezone \
  && apk del tzdata
#RUN addgroup -g ${USER} apachegroup || :
RUN adduser --uid ${USER} apacheuser || :
RUN sed -i "s/Group daemon/Group apacheuser/" /usr/local/apache2/conf/httpd.conf  
RUN sed -i "s/User daemon/User apacheuser/" /usr/local/apache2/conf/httpd.conf  
EXPOSE 80/tcp
