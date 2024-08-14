FROM node:20-alpine AS build

WORKDIR /app/proxy-backend

COPY src/proxy-backend/*.ts src/proxy-backend/controller src/proxy-backend/package.json src/proxy-backend/tsconfig.json /app/proxy-backend/

COPY src/shared /app/shared
COPY src /app/

RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app/proxy-backend
RUN chown -R node:node /app

COPY --from=build --chown=node:node /app/proxy-backend/dist/proxy-backend/* /app/proxy-backend/
COPY --from=build --chown=node:node /app/proxy-backend/dist/proxy-backend/controller/* /app/proxy-backend/controller/
COPY --from=build --chown=node:node /app/proxy-backend/dist/shared/ /app/shared/
COPY --from=build --chown=node:node /app/proxy-backend/package.json /app/proxy-backend/package-lock.json /app/proxy-backend/

RUN npm install

USER node

CMD ["node", "index.js"]
