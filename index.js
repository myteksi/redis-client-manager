/*
 * Copyright (c) MyTeksi GrabTaxi 2013
 * Author: Fadrizul Hasani <fadrizul@gmail.com>
 */
(function () { 'use strict';

  var redis  = require('redis');
  var _      = require('underscore');
  var cached = {};


  function gracefulExit (opts, err) {
    if (opts.cleanup) {
      _.each(cached, function (client) {
        if (client) {
          client.quit();
        }
      });

      cached = {};
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
  exports.getClient = function (opts, useSub) {
    opts = opts || {};

    var cacheKey    = JSON.stringify(opts) + (useSub ? '_SUB' : '');
    var redisClient = cached[cacheKey];
    if (redisClient) {
      return redisClient;
    }

    redisClient = cached[cacheKey] = redis.createClient(opts.redisPort,
                                                        opts.redisHost);
    return redisClient;
  };



}).call(this);
