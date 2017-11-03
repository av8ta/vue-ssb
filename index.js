var ssbClient = require('ssb-client')
var pull = require('pull-stream')

// // simplest usage, connect to localhost sbot
ssbClient(
  {
    "caps": {
      "shs": "MVZDyNf1TrZuGv3W5Dpef0vaITW1UqOUO3aWLNBp+7A=",
      "sign": "qym3eJKBjm0E0OIjuh3O1VX8+lLVSGV2p5UzrMStHTs="
    },
    "port": 8007,
    "ws": {
      "port": 8988
    },
    "ssb_appname": "ssb_test",
    "plugins": {
      "ssb-about": true,
      "ssb-backlinks": true,
      "ssb-fulltext": true
    }
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
