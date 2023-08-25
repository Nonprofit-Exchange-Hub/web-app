# Multi-stage build to take advantage of stage caching
FROM node:16-alpine as embeddedFrontEnd

WORKDIR /app/temp/client

COPY ./client .

RUN npm ci && npm run build



FROM node:16-alpine

WORKDIR /app/server

COPY ./server .

RUN npm ci

RUN mkdir -p /app/client

COPY --from=embeddedFrontEnd /app/temp/client/build/ /app/client/build/

WORKDIR  /app/server

# Build for production
RUN npm run prebuild && npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
