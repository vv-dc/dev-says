FROM node:15-stretch-slim AS build
WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    yarn --frozen-lockfile

FROM build AS lint
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=.eslintrc.json,target=.eslintrc.json \
    --mount=type=bind,source=.prettierrc,target=.prettierrc \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=build \
    yarn lint:check && yarn format:check

FROM build AS test
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=build \
    yarn test

FROM build AS production
COPY ./src ./src
RUN --mount=type=bind,source=/usr/src/app/node_modules,target=node_modules,from=build
CMD ["node", "src/index.js"]
