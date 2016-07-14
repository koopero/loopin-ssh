module.exports = loopinSSH

loopinSSH.options = require('boptions')({
  host: '',
  port: 22,
  username: 'loopin',
  password: '',
  privateKey: ''
})

function loopinSSH() {
  const loopin = this
      , Promise = loopin.Promise
      , opt = loopinSSH.options( arguments )
      , log = loopin.log.bind( loopin, 'ssh')

  var _conn
    , _stdio

  var promise = Promise.resolve( opt )
  promise = promise.then( connect )
  .then( run )
  return promise

  function connect() {
    return new Promise( function ( resolve, reject ) {
      _conn = new (require('ssh2').Client)()
      _conn.on('ready', function () {
        log('ready')
        resolve( _conn )
      })
      _conn.on('error', function ( err ) {
        reject( err )
      })
      _conn.connect( opt )
    })
  }

  function run() {
    return new Promise( function ( resolve, reject ) {
      _conn.shell( function ( err, stream ) {
        if ( err )
          return reject( err )

        log('shell')

        _stdio = {
          stdin: stream,
          stdout: stream,
          stderr: stream.stderr
        }

        loopin.plugin('stdio', _stdio )
        stream.write('loopin-native\n')
        resolve()
      })
    })
  }
}
