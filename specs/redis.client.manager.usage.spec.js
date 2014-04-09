var should = require('should');
var redisManager = require('../index');

describe('When using the Redis client manager', function() {

  var key = 'redisclientmanager:test';

  beforeEach(function(done) {
    redisClient = redisManager.getClient();
    done();
  });

  after(function(done) {
    redisClient.quit()
    done()
  })

  describe('When pushing a value to a list', function() {

    beforeEach(function(done) {
      redisClient.lpush(key, 'myValue', function(error, numOfItems) {
        done();
      });
    });

    afterEach(function(done) {
      redisClient.del(key, function(error, numOfItems) {
        done();
      });
    });

    it('should have one item only', function(done) {
      redisClient.lrange(key, 0, -1, function(error, items) {
        items.length.should.equal(1);
        done();
      });
    });

  });
});