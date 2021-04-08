
FROM httpd:2.4-alpine

RUN apk add --no-cache tzdata -y \
  && cp /usr/share/zoneinfo/Asia/Nicosia /etc/localtime \
  && echo "Asia/Nicosia" >  /etc/timezone \
  && apk del tzdata
EXPOSE 80/tcp
