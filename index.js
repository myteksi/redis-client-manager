/*
Copyright (c) MyTeksi GrabTaxi 2013
Author: Fadrizul Hasani <fadrizul@gmail.com>
*/

var redis = require('redis')
var redisClient = null

// When main process dies, kill the redis connection as well
process.on('exit', function () {
  // Check if the connection exist before quitting
  if (redisClient != null) {
    redisClient.quit()
  }
})

// Function to get the connection, if the connection exist returns the connection.
// If it doesn't exist, create a new connection
// Take in options for the port & host
exports.getClient = function (opts) {
  var opts = opts || {}

  if (redisClient === null) {
    redisClient = redis.createClient(opts.redisPort, opts.redisHost)
  }
  return redisClient
}
