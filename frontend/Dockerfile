FROM node:15-stretch-slim AS base
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    yarn --frozen-lockfile

FROM base AS lint
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=.eslintrc.json,target=.eslintrc.json \
    --mount=type=bind,source=.prettierrc,target=.prettierrc \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=base \
    yarn lint && yarn format:check

FROM base AS test
RUN --mount=type=bind,src=src,target=src \
    --mount=type=bind,src=package.json,target=package.json \
    --mount=type=bind,src=/usr/src/app/node_modules,target=node_modules,from=base \
    yarn test

FROM base AS build
COPY --from=base /usr/src/app/node_modules node_modules
RUN --mount=type=bind,src=src,target=src \
    --mount=type=bind,src=public,target=public \
    --mount=type=bind,source=.eslintrc.json,target=.eslintrc.json \
    --mount=type=bind,source=.prettierrc,target=.prettierrc \
    --mount=type=bind,src=package.json,target=package.json \
    yarn build

FROM nginx:1.19-alpine AS production
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /var/www/devsays.tk
RUN chmod -R 755 /var/www
CMD ["nginx"]
