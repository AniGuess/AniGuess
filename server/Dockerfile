FROM node:16-alpine as build
WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --forzen-lockfile
COPY . .
RUN yarn build

FROM node:16-alpine as deps
WORKDIR /app
ENV NODE_ENV=production
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn --prod --frozen-lockfile

FROM node:16-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY ./package.json ./
COPY ./yarn.lock ./
COPY --from=build /app/dist ./dist/
COPY --from=deps /app/node_modules ./node_modules/
RUN ls -a
CMD ["yarn", "start:prod"]

