'use strict';

const fs = require('fs');

const configStart = '(function () {\n\'use strict\';\n/*jshint ignore:start*/\nangular.module(\'worldshaper.config\', [])\n.constant(';
const configEnd = ');\n /*jshint ignore:end*/\n})();';
const configFile = require('./config/worldshaperConfig.json');

function createConfigFile(env) {
  let envConfig = configFile[env];
  let envConfigStr = JSON.stringify(envConfig).replace(':',',');
  let configModule = configStart + envConfigStr.substring(1,envConfigStr.length-1) + configEnd;

  // now make this into a file
  fs.writeFile('./src/config/worldshaperConfig.js', configModule, function (err) {
    if(err) {
      console.log('Error found: ' + err);
    } else {
      console.log('worldshaperConfig.js created!');
    }
  });
}

var env = process.env.NODE_ENV || 'local';
createConfigFile(env);
