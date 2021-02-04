'use strict';

var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || "2uXEQbaKBg1L4ONrN31P7pl2-9Nh9j0Va",
  appKey: process.env.LEANCLOUD_APP_KEY || "BMtfyvej4iax42ft8PjV6fhV",
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || "tV1khJvRmb3sMgRMfvjyUUWK",
  serverURL: "https://2uxeqbak.lc-cn-e1-shared.com"
});

// Comment the following line if you do not want to use masterKey.
AV.Cloud.useMasterKey();

var app = require('./app');

// Retrieves the port number from environment variable `LEANCLOUD_APP_PORT`.
// LeanEngine runtime will assign a port and set the environment variable automatically.
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // Registers a global exception handler for uncaught exceptions.
  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});
