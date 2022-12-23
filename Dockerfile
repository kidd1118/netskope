FROM node:18-alpine AS build
WORKDIR /app
COPY /app ./
RUN yarn && yarn build


FROM node:18-alpine AS deploy
WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

EXPOSE 3000
CMD [ "yarn", "start" ]
