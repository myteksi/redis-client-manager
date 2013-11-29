Redis Client Manager
====================

Super simple redis client manager to make sure that we don't need to spawn multiple redis connection.

### Usage
```
var redisManager = require('redis-client-manager')
var redisClient = redisManager.getClient()

redisClient.lpush('hello_queue', 'world')
```

### Running test
```
npm test
```