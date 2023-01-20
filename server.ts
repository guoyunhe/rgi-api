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
import { readFileSync } from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import 'reflect-metadata';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install({ handleUncaughtExceptions: false });

console.log(process.env.HOST);

new Ignitor(__dirname).httpServer().start((handle) => {
  if (process.env.SSL_KEY && process.env.SSL_CERT) {
    return createHttpsServer(
      {
        key: readFileSync(process.env.SSL_KEY),
        cert: readFileSync(process.env.SSL_CERT),
      },
      handle
    );
  } else {
    return createHttpServer(handle);
  }
});
