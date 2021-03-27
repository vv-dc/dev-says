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
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=base \
    yarn test

FROM base AS production
COPY src src
COPY package.json package.json
RUN --mount=target=.,from=base
CMD ["yarn", "start"]
