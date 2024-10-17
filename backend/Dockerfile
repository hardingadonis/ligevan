FROM node:20.17.0-alpine AS base
RUN addgroup -S backend && \
    adduser -S backend -G backend
USER backend
WORKDIR /app
EXPOSE 3000

#--------------------------------------------------

FROM base AS build
USER backend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY ./src ./src
COPY tsconfig.json tsconfig.build.json ./
RUN yarn build --webpack

#--------------------------------------------------

FROM base AS production
ARG NODE_ENV=production
USER backend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --ignore-scripts
COPY --from=build /app/dist .
ENTRYPOINT ["node", "main.js"]
