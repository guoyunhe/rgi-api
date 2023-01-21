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

### System requirements

- Modern GNU/Linux with systemd
- Node.js 16+
- MySQL/MariaDB
- [Certbot](https://certbot.eff.org/)
- Nginx, optional

### SSL certificates

First you need to add IPv4(A) and IPv6(AAAA) DNS records of your domain (e.g. api.example.com) and your server IP.

Then in your server, run:

```
sudo cerbot certonly
```

Follow the instruction and you should get SSL certificates installed.

### Environment variables

```ini
# Must be 443 for HTTPS
PORT=443
# Comma seperated list of your web apps
CORS_ORIGIN=https://retrogameindex.netlify.app
# Run Node.js in production mode
NODE_ENV=production
# Use a random key and keep it secret
APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
# Store files on local disk or Amazon S3
DRIVE_DISK=local
# If use local drive, specify absolute path of your storage
DRIVE_LOCAL_ROOT=/srv/www/rgi-api/storage
# Database type
DB_CONNECTION=mysql
# Database info
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=dbuser
MYSQL_PASSWORD=dbsecret
MYSQL_DB_NAME=dbname
```

### Build and start

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
