/*
Copyright (c) MyTeksi GrabTaxi 2013
Author: Fadrizul Hasani <fadrizul@gmail.com>
*/
(function () {
  var redis, redisClient;

  redis = require('redis');
  redisClient = null;

  function gracefulExit(options, err) {
    if (options.cleanup) {
      // Check if the connection exist before quitting
      if (redisClient != null) {
        redisClient.quit();
      }
    }

    if (err) {
      console.log(err.stack);
    }

    if (options.exit) {
      redisClient.quit();
      process.exit();
    }
  }

  // Handle processes signals
  process.on('exit', gracefulExit.bind(null, { cleanup : true }));
  process.on('SIGINT', gracefulExit.bind(null, { exit : true }));
  process.on('uncaughtException', gracefulExit.bind(null, { exit : true }));

  // Function to get the connection, if the connection exist returns the connection.
  // If it doesn't exist, create a new connection
  // Take in options for the port & host
  exports.getClient = function (opts) {
    var opts = opts || {};
    return redisClient || redis.createClient(opts.redisPort, opts.redisHost);
  };

}).call(this);