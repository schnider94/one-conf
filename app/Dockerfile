FROM node:19-alpine as deps

WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

COPY /package.json /package-lock.json /
RUN npm i

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine as app

COPY --from=deps /app/dist /var/www/app
COPY /deploy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
