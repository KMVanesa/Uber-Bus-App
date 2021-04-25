FROM nginx
COPY front-end.nginx /
RUN mv front-end.nginx /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html