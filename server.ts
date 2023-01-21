/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import { Ignitor } from '@adonisjs/core/build/standalone';
import { existsSync, readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import 'reflect-metadata';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install({ handleUncaughtExceptions: false });

new Ignitor(__dirname).httpServer().start((handle) => {
  const sslKey = `/etc/letsencrypt/live/${process.env.HOST}/privkey.pem`;
  const sslCert = `/etc/letsencrypt/live/${process.env.HOST}/fullchain.pem`;
  if (existsSync(sslKey) && existsSync(sslCert)) {
    return createHttpsServer(
      {
        key: readFileSync(sslKey),
        cert: readFileSync(sslCert),
      },
      handle
    );
  } else {
    return createHttpServer(handle);
  }
});
