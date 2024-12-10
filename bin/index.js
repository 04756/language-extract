#!/usr/bin/env node
const { program } = require('commander');
const { extract } = require('../utils/extract');
const { count } = require('../utils/count');
const { wrap } = require('../utils/wrap');
const { init } = require('../utils/init');

program
  .version('1.0.0', '-v, --version', 'show version')
  .command('run')
  .option('-e, --extract', 'extract specific language words in files')
  .option('-c, --count', 'count specific language words in files')
  .option('-w, --wrap', 'wrap words with specific function')
  .option('-q, --quiet', 'loading file without detail')
  .action((opts) => {
    init({ quiet: opts.quiet });
    count({ quiet: opts.quiet });

    if (opts.extract) {
      extract();
    }
    if (opts.wrap) {
      wrap();
    }
  })

program.parse(process.argv);