FROM node:20.17.0-alpine AS base
USER hardingadonis
WORKDIR /app
EXPOSE 3000

#--------------------------------------------------

FROM base AS build
WORKDIR /app
COPY ["package.json", "./"]
COPY ["yarn.lock", "./"]
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

#--------------------------------------------------

FROM base AS production
ARG NODE_ENV=production
WORKDIR /app
COPY ["package.json", "./"]
COPY ["yarn.lock", "./"]
RUN yarn install --frozen-lockfile --production
COPY --from=build /app/dist .
ENTRYPOINT ["node", "main.js"]
