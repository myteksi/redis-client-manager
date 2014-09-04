/*
 * Copyright (c) MyTeksi GrabTaxi 2013
 * Author: Fadrizul Hasani <fadrizul@gmail.com>
 */
(function () { 'use strict';

  var redis, redisClient, redisSecondClient;

  redis             = require('redis');
  redisClient       = null;
  redisSecondClient = null;

  function gracefulExit (opts, err) {
    if (opts.cleanup) {
      // Check if the connection exist before quitting
      if (redisClient != null) {
        redisClient.quit();
        redisClient = null;
      }

      if (redisSecondClient != null) {
        redisSecondClient.quit();
        redisSecondClient = null;
      }
    }

    if (err) {
      console.log(err.stack);
    }

    if (opts.exit) {
      process.exit();
    }
  }

  // Handle processes signals
  process.on('exit', gracefulExit.bind(null, { cleanup : true }));
  process.on('SIGINT', gracefulExit.bind(null, { exit : true }));
  process.on('uncaughtException', gracefulExit.bind(null, { exit : true }));

  // Function to get the connection, if the connection exist returns the
  // connection.
  // If it doesn't exist, create a new connection.
  // Take in options for the port & host.
  exports.getClient = function (opts) {
    opts = opts || {};

    if (redisClient === null) {
      redisClient = redis.createClient(opts.redisPort, opts.redisHost);
    }

    return redisClient;
  };

  exports.getSecondClient = function (opts) {
    opts = opts || {};

    if (redisSecondClient === null) {
      redisSecondClient = redis.createClient(opts.redisPort, opts.redisHost);
    }

    return redisSecondClient;
  };

}).call(this);
