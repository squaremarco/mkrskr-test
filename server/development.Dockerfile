FROM node:16-alpine

RUN mkdir /app

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci

COPY src src

CMD npm run start:dev
