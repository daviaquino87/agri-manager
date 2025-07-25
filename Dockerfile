FROM node:18-alpine

WORKDIR /home/node/app

ENV NODE_ENV development
ENV TZ America/Fortaleza

RUN npm install -g @nestjs/cli
RUN apk add --no-cache tzdata
RUN mkdir /home/node/storage && chown node:node -Rf /home/node/storage
