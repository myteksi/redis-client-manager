/*
Copyright (c) MyTeksi GrabTaxi 2013
Author: Fadrizul Hasani <fadrizul@gmail.com>
*/

var should = require('should')
var redisManager = require('../index')

describe('When call the manager to get the redis client', function () {
  beforeEach(function (done) {
    redisClient = redisManager.getClient()
    done()
  })

  after(function (done) {
    redisClient.quit()
    done()
  })

  it('should not return an empty object', function (done) {
    should.exist(redisClient)
    done()
  })

  it('should be in ready state', function (done) {
    redisClient.ready.should.be.true
    done()
  })
})