FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --silent

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]