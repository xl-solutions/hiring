FROM python:3.10.2
FROM node:15.14.0 as build

WORKDIR /app

COPY . .

RUN yarn

RUN yarn build


#star nginx
FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html