## Tweeti
Tweeti is a tweet scheduler for twitter. Save your thoughts or ideas, and tell tweeti when to share them with your followers.

### Run Tests
`gulp test`
    
### Getting Started
Install the following external dependencies

| Store    | Purpose |
|:-------------:|-------------|
| [MongoDB](https://www.mongodb.org/downloads) | Used to store application state information |
| [Redis](http://redis.io/download) | Used as a message queue to schedule user tweets |
| [tweeti-worker](https://github.com/horaceheaven/tweeti-worker)      | Consumes tweet information from message broker for posting to twitter |

Install tweeti npm packages 
```shell 
$ npm install
```

Start tweeti 
```shell
$ gulp start
```
  or
```shell
$ npm start
```

Go to `http://localhost:3000`
