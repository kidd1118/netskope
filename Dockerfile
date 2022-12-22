FROM node:18-alpine AS dependencies
WORKDIR /app
COPY /app/package.json ./package.json
COPY /app/package-lock.json ./package-lock.json
RUN yarn

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN yarn build-next

FROM node:18-alpine AS deploy
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json

EXPOSE 3000
CMD [ "yarn", "start-next" ]
