#!/usr/bin/env node
const { program } = require('commander');
const { extract } = require('../utils/extract');

program
  .version('1.0.0', '-v, --version', 'show version')
  .command('run')
  .option('-e, --extract', 'extract specific language words in files')
  .option('-c, --count', 'count specific language words in files')
  .option('-w, --wrap', 'wrap words with specific function')
  .action((opts) => {
    if (opts.extract) {
      extract();
    }
  })

program.parse(process.argv);