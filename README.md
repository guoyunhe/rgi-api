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
npm run dev
```

If remote source code was changed, run above commands again to update your local project.

## Production Deployment

### System requirements

- Modern GNU/Linux with systemd
- Node.js 16+
- MySQL/MariaDB
- Certbot
- NGINX

Read [Setup openSUSE VPS](https://en.opensuse.org/Setup_openSUSE_VPS)

### NGINX configuration

```
server {
  listen 80;
  listen [::]:80;
  server_name example.com;

  client_max_body_size 20M;

  location / {
    proxy_pass http://localhost:3333;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### Environment variables

```ini
# Must match NGINX proxy_pass
PORT=3333
# Comma seperated list of your web apps
CORS_ORIGIN=https://example.com,https://www.example.com
# Run Node.js in production mode
NODE_ENV=production
# Run `node ace generate:key` to get a random key and keep it secret
APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
# Name your app
APP_NAME=MyApp
# The public URL forwarded by NGINX proxy
APP_URL=https://api.example.com
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

### Build and migrate database

```bash
# install dependencies
npm install

# migrate database structure
node ace migration:run

# build the server
npm run build
```

### Start the server

```bash
# install daemon process manager to keep your app always online
sudo npm i -g pm2
# start app
pm2 start pm2.config.js
# save app config
pm2 save
# save systemd service for auto-start on system boot
pm2 startup

# restart daemon process after
pm2 restart all
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
