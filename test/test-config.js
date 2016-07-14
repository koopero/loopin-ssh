const yaml = require('js-yaml')
    , fs = require('fs')
    , resolve = require('path').resolve
    , path = resolve( __dirname, 'test-config.yaml' )
    , text = fs.readFileSync( path, 'utf8' )
    , data = yaml.safeLoad( text )

module.exports = data
