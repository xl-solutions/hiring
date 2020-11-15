FROM node:12

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ARG REACT_APP_BASE_URL

ENV REACT_APP_BASE_URL=${REACT_APP_BASE_URL}
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ENV NODE_OPTIONS=--max_old_space_size=8192

COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app
RUN npm run build


### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
