module.exports = function(verbose) {
  'use strict';

  const fs      = require('fs');
  const file    = fs.readFileSync('index.html', 'utf-8');
  const scripts = file
    .split('\n')
    .reduce((scripts, line) => {
      const matches = line.match(/<script.*src="([^"]+)"/);

      if (matches)
        scripts.push(matches[1]);
      return scripts;
    }, [])
    .filter(script => {
      return !script.match(/^node_modules/) &&
             !script.match(/glTest.js/) &&
             !script.match(/bsy-webgl.min.js/);
    });

  return scripts;
};

