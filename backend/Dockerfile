FROM node:20.17.0-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY . .
CMD [ "yarn", "start" ]
