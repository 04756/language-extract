const { getFileContent, getFilesPath, getFilesContent } = require('./file');
const path = require('path');
const { getState } = require('../stores/global');

const run = () => {
  // read config json
  try {
    const globalState = getState();

    console.log('> Loading config file...')

    const configs = JSON.parse(getFileContent(path.resolve('./language-cli.config.json')));
    globalState.setConfigs(configs);


    console.log('> Loading files...')

    // find all files which match the file pattern
    const allFilesPath = getFilesPath(path.resolve(configs.src), '*', configs.ignore);
    // read all files content
    const allFilesContent = getFilesContent(allFilesPath);

    globalState.setFilesContent(allFilesContent);

    console.log('> Loading files finished')

  } catch (e) {
    console.log('> Loading config file error')

    throw e;
  }
};

exports.init = run;