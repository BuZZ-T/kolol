# Kolol

Angular Frontend for [kingdomofloathing.com](https://www.kingdomofloathing.com) ("KoL").

An existing user of [kingdomofloathing.com](https://www.kingdomofloathing.com) is needed to use this app. Creating a KoL user is currently not supported by kolol.

This project is in a very early state of development. Some parts are already functional. Some parts have parts, which are already functional. And many parts cannot be used, yet.

### Starting local

Start the frontend
```
npm start
```

Start the proxy-backend
```
cd proxy-backend
npm start
```

Start the frontend against the deployed backend
```
npm run start:prod
```

### Building and deploying

#### Build using `ng`
```
npm run build
```

#### Build using docker
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

#### Normal build
The build artifact is placed in `dist/`, ship it on your own

#### Docker build
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
