FROM node:16-alpine

# working dir
WORKDIR /app

COPY . .

RUN npm install -g npm@7

RUN cd ./client && npm ci  && npm run build && cd ..

RUN cd ./server && npm ci  && cd ..

RUN mkdir -p /app/server/client

RUN cp -r ./client/build/ ./server/client/build/


WORKDIR  /app/server

# Build our app for production
RUN npm run prebuild && npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
