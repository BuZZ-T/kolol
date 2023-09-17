FROM node:20-alpine AS build

WORKDIR /app/proxy-backend

COPY proxy-backend/*.ts proxy-backend/package.json proxy-backend/tsconfig.json /app/proxy-backend/
COPY src /app/

RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app
RUN chown -R node:node /app

COPY --from=build --chown=node:node /app/proxy-backend/dist/* /app/
COPY --from=build --chown=node:node /app/proxy-backend/package.json /app/proxy-backend/package-lock.json /app/

RUN npm install

USER node

CMD ["node", "index.js"]
