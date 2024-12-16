const { writeFileContent } = require('./file');
const path = require('path');
const { getState } = require('../stores/global');
const fs = require('fs');


const run = (opts) => {
  // read config json
  try {
    const globalState = getState();

    const temp = {};
    globalState.langsExtract.map((lang) => temp[lang] = lang);

    console.log('> Extract words...')
    const filePath = path.resolve(`${globalState?.configs?.output}/extract.json`);
    if (!fs.existsSync(globalState?.configs?.output)) {
      fs.mkdirSync(globalState?.configs?.output);
    }

    writeFileContent(filePath, JSON.stringify(temp, null, 2));
    console.log('> All files extracted, file destination', filePath);

  } catch (e) {
    if (!opts?.quiet) {
      console.error('> Extract failed: ', e);
    }
  }
};

exports.extract = run;