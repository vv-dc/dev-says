FROM node:15-alpine AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:1.19-alpine

COPY --from=build /usr/src/app/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
