FROM node:16.4.2

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

ENV NODE_ENV=develop

RUN yarn build

CMD yarn start
