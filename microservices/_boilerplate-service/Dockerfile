FROM node:19-alpine as deps

COPY . .

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

RUN npm i

EXPOSE 4000
ENTRYPOINT [ "node", "index.js" ]
