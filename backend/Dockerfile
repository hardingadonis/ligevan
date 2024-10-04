FROM node:20.17.0-alpine
WORKDIR /app
ENV NODE_ENV production
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production
COPY --chown=node:node . .
RUN yarn build
CMD [ "yarn", "start:prod" ]
