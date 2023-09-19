# Kolol

Angular Frontend for [kingdomofloathing.com](https://www.kingdomofloathing.com) ("KoL").

An existing user of [kingdomofloathing.com](https://www.kingdomofloathing.com) is needed to use this app. Creating a KoL user is currently not supported by kolol.

This project is in a very early state of development. Some parts are already functional. Some parts have parts, which are already functional. And many parts cannot be used, yet.

### Development

The project consists of an Angular frontend, located in `src/app/` and a node/express proxy-backend, located in `proxy-backend/`. As the name suggests, the backend is only a cors-proxy to KoL, as the KoL pages don't contain CORS headers. The backend does not store credentials at all!

### Starting local

#### Start the frontend
in dev mode:
```
npm start
```
against the deployed backend [https://kolol.buzz-t.eu](https://kolol.buzz-t.eu):
```
npm run start:prod
```

#### Start the proxy-backend
```
cd proxy-backend
npm start
```



### Building and deploying

#### Build the frontend
```
npm run build
```

#### Build the proxy-backend
Create a `build.sh` like this:
```sh
#!/bin/sh
docker build -t <docker-registry>/kolol-proxy-backend . --no-cache
```
make it executable
```sh
chmod +x build.sh
```
run
```
npm run docker
```

### Deploying

#### The frontend
The build artifact is placed in `dist/`, ship it on your own

#### The proxy-backend
Create a `deploy.sh` like this:
```sh
#!/bin/sh
docker push <docker-registry>/kolol-proxy-backend
```
make it executable
```sh
chmod +x deploy.sh
```
run
```
npm run deploy
```

### Deployed instance (not suitable for a heavy load of users)

[https://kolol.buzz-t.eu](https://kolol.buzz-t.eu)
