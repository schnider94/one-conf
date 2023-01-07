FROM node:19-alpine as deps

COPY . .

ARG GITHUB_TOKEN

RUN "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" > ~/.npmrc
RUN npm i

EXPOSE 4000
ENTRYPOINT [ "node", "index.js" ]
