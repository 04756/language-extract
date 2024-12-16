const { count } = require("../utils/count");
const { init } = require("../utils/init");
const { wrap } = require("../utils/wrap");


init({ quiet: true, configSrc: 'examples/language-cli-test.config.json' });
count({ quiet: true });

wrap();
