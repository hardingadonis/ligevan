FROM node:20.17.0-alpine AS build
USER frontend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY ./src ./src
COPY tsconfig.app.json tsconfig.json tsconfig.build.json ./
RUN yarn build

#--------------------------------------------------

FROM nginx:1.27.2-alpine AS production
USER frontend
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
