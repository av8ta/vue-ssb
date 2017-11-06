<template>
  <div id="hello">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vueify" target="_blank">vueify</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
var ssbClient = require('ssb-client')
var pull = require('pull-stream')

// // simplest usage, connect to localhost sbot
// "caps": {
//       "shs": "MVZDyNf1TrZuGv3W5Dpef0vaITW1UqOUO3aWLNBp+7A=",
//       "sign": "qym3eJKBjm0E0OIjuh3O1VX8+lLVSGV2p5UzrMStHTs="
//     },
//     "port": 8007,
//     "ws": {
//       "port": 8988
//     },
//     "ssb_appname": "ssb-test",
ssbClient(
  {
    "caps": {
      "shs": "dfCIY3rP5idQFdjuOHrBJqrv6EgsSiNyn1NKz87UTJw=",
      "sign": null
    },
    "port": 8008,
    "ws": {
      "port": 8988
    },
    "plugins": {
      "ssb-about": true,
      "ssb-backlinks": true,
      "ssb-fulltext": true
    },
    "manifest": {
    "auth": "async",
    "address": "sync",
    "manifest": "sync",
    "get": "async",
    "createFeedStream": "source",
    "createLogStream": "source",
    "messagesByType": "source",
    "createHistoryStream": "source",
    "createUserStream": "source",
    "links": "source",
    "relatedMessages": "async",
    "add": "async",
    "publish": "async",
    "getAddress": "sync",
    "getLatest": "async",
    "latest": "source",
    "latestSequence": "async",
    "whoami": "sync",
    "progress": "sync",
    "status": "sync",
    "getVectorClock": "async",
    "seq": "async",
    "usage": "sync",
    "clock": "async",
    "plugins": {
      "install": "source",
      "uninstall": "source",
      "enable": "async",
      "disable": "async"
    },
    "gossip": {
      "peers": "sync",
      "add": "sync",
      "remove": "sync",
      "ping": "duplex",
      "connect": "async",
      "changes": "source",
      "reconnect": "sync",
      "enable": "sync",
      "disable": "sync"
    },
    "replicate": {
      "changes": "source",
      "upto": "source",
      "request": "sync"
    },
    "friends": {
      "get": "async",
      "createFriendStream": "source",
      "stream": "source",
      "hops": "async"
    },
    "blobs": {
      "get": "source",
      "getSlice": "source",
      "add": "sink",
      "rm": "async",
      "ls": "source",
      "has": "async",
      "size": "async",
      "meta": "async",
      "want": "async",
      "push": "async",
      "changes": "source",
      "createWants": "source"
    },
    "invite": {
      "create": "async",
      "accept": "async",
      "use": "async"
    },
    "private": {
      "publish": "async",
      "unbox": "sync"
    },
    "query": {
      "read": "source"
    },
    "links2": {
      "read": "source"
    },
    "ws": {
      "getAddress": "sync"
    },
    "about": {
      "stream": "source",
      "get": "async"
    },
    "backlinks": {
      "read": "source"
    },
    "fulltext": {
      "search": "source"
    }
  },
  },
  function (err, sbot) {
  if(err) {
    console.log('err', err)
  }
  else {
    console.log('sbot', sbot)
    // publish a message
    // sbot.publish({ type: 'post', text: 'test post, please ignore' }, function (err, msg) {
      // msg.key           == hash(msg.value)
      // msg.value.author  == your id
      // msg.value.content == { type: 'post', text: 'My First Post!' }
      // ...

    console.log("getting all messages")

    // stream all messages in all feeds, ordered by receive time
    pull(
      sbot.createLogStream(),
      pull.drain(function (msg) {
        // ALL MESSAGES HAPPEN HERE
        console.log(msg)
    })
  )
  }
})

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
#hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
