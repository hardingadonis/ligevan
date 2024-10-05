FROM node:20.17.0-alpine AS build
RUN addgroup -S frontend && \
    adduser -S frontend -G frontend
USER frontend
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --ignore-scripts
COPY ./src ./src
COPY ./public ./public
COPY index.html tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ./
RUN yarn build

#--------------------------------------------------

FROM nginx:1.27.2-alpine AS production
RUN addgroup -S frontend && \
    adduser -S frontend -G frontend && \
    chown -R frontend:frontend /run /var/cache/nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
USER frontend
CMD ["nginx", "-g", "daemon off;"]
