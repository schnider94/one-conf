FROM node:19-alpine as deps

COPY . .

RUN npm i

EXPOSE 4000
ENTRYPOINT [ "node", "index.js" ]
