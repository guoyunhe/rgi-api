# Retro Game Index API Server

## Local Development

System requirements:

- Docker
- Git
- Node.js 16+

First, you need to fork and clone the git repository.

Then run the following commands:

```bash
# start docker containers for mysql, etc.
docker compose up

# configure environment variables
cp .env.example .env

# install dependencies
npm install

# migrate database schema
node ace migration:run

# seed database content
node ace db:seed

# start server with auto-reload
node ace serve --watch
```

If remote source code was changed, run above commands again to update your local project.

## Production Deployment

System requirements:

- GNU/Linux
- Systemd, included in most modern GNU/Linux distributions
- Node.js 16+
- MySQL/MariaDB/Postgres
- Python 3
- [Certbot](https://certbot.eff.org/)

Initial deployment (Linux):

```bash
# generate https certificates
sudo certbot certonly

# configure environment variables
cp .env.example .env
vi .env

# install dependencies
npm install

# migrate database structure
node ace migration:run

# build the server
node ace build --production

# daemon process manager to keep your app always online
sudo npm i -g pm2
sudo pm2 startup
sudo ENV_PATH=/srv/www/example.com/.env HOST=example.com pm2 start build/server.js
sudo pm2 save
sudo systemctl restart pm2-root
```

Regular update:

```bash
# install dependencies
npm install

# migrate database structure
node ace migration:run

# build the server
node ace build --production

# restart daemon process
sudo systemctl restart pm2-root
```

## Internationalization

English (en) is the source language of the database. Other supported languages for translations:

- Aribic (ar)
- German (de)
- Spanish (es)
- Persian (fa)
- Finnish (fi)
- French (fr)
- Hindi (hi)
- Italian (it)
- Japanese (ja)
- Korean (ko)
- Dutch (nl)
- Polish (po)
- Portuguese (pt)
- Russion (ru)
- Swedish (sv)
- Ukrainian (uk)
- Vietnamese (vi)
- Chinese (zh)

## API

### Authentication

#### POST /login

Body:

```ts
interface RequestData {
  name: string;
  email: string;
  password: string;
}
```

#### POST /register

## Documentation

- [adonis-api-template](https://github.com/guoyunhe/adonis-api-template) - the template
- [AdonisJS](https://docs.adonisjs.com/) - the framework
- [PM2](https://pm2.keymetrics.io/) - the daemon process manager
- [Certbot](https://certbot.eff.org/) - get free HTTPS certificates

## About The Template

This app is generated from https://github.com/guoyunhe/adonis-api-template

Issues and pull requests are always welcome.

Looking for a front-end template, too? Checkout https://github.com/guoyunhe/react-app-template
