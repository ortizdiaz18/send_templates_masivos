FROM nginx:1.20.1
COPY /build /usr/share/nginx/html
EXPOSE 80:80

