const loopinSSH = require('../index')
    , config = require('./test-config')
    , loopin = require('loopin')()


console.log('config', config)

loopin.plugin( loopinSSH, config )
.then( function () {
  loopin.patch( {
    text: {
      works: 'SSH!'
    }
  })
})
