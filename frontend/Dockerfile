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
    yarn lint --format=json --output-file=main.lint.json && yarn format:check

FROM base AS test
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=base \
    yarn test --json --outputFile=main.test.json

FROM base AS build

ARG REACT_APP_HOST
ARG REACT_APP_API_HOST
ARG REACT_APP_GITHUB_ID
ARG REACT_APP_GOOGLE_ID

COPY --from=base /usr/src/app/node_modules node_modules
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=public,target=public \
    --mount=type=bind,source=.eslintrc.json,target=.eslintrc.json \
    --mount=type=bind,source=.prettierrc,target=.prettierrc \
    --mount=type=bind,source=package.json,target=package.json \
    yarn build

FROM scratch AS ci
COPY --from=lint /usr/src/app/main.lint.json .
COPY --from=test /usr/src/app/main.test.json .
COPY --from=build /usr/src/app/build/index.html .

FROM nginx:1.19-alpine AS production
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /var/www/html
RUN chmod -R 755 /var/www
CMD ["nginx"]