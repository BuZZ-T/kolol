# Kolol

Angular Frontend for [kingdomofloathing.com](https://www.kingdomofloathing.com) ("KoL").

An existing user of [kingdomofloathing.com](https://www.kingdomofloathing.com) is needed to use this app. Creating a KoL user is currently not supported by kolol.

This project is in a very early state of development. Some parts are already functional. Some parts have parts, which are already functional. And many parts cannot be used, yet.

### Development

The project consists of an Angular frontend, located in `src/app/` and a node/express proxy-backend, located in `src/proxy-backend/`. As the name suggests, the backend is a cors-proxy to KoL, as the KoL pages don't contain CORS headers. It also parses some pages like the inventory and skill page server-side. The backend does not store any credentials!

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

### FAQ
#### Do you store credentials in the backend
No. Not at all. Take look at the `/login` endpoint in [`src/proxy-backend/index.ts`](https://github.com/BuZZ-T/kolol/blob/main/src/proxy-backend/index.ts#L27-L78) and the `doLogin` function in [`src/proxy-backend/request.ts`](https://github.com/BuZZ-T/kolol/blob/main/src/proxy-backend/request.ts#L7-L52). That's where the login is handled. It's not stored, only returned.
#### My page can't get parsed
Maybe you have a different configuration in KoL and your inventory, campground or skills are categorized in a way kolol does not support at the moment.. Sorry for that.
#### Can you create a KoL user in kolol
No, not at the moment.
#### Many things aren't supported by kolol yet...
Yes, that's true. Holidays, Chat, Clan, Events (any many things more) are not supported, yet.