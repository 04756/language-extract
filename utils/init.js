const { getFileContent, getFilesPath, getFilesContent } = require('./file');
const path = require('path');
const { getState } = require('../stores/global');

const run = ({ quiet, configSrc }) => {
  // read config json
  try {
    const globalState = getState();

    console.log('> Loading config file...')

    const configFileSrc = path.resolve(configSrc || './language-cli.config.json');
    const configs = JSON.parse(getFileContent(configFileSrc));
    globalState.setConfigs(configs);

    console.log('> Loading config file successed, file path:', configFileSrc);

    console.log('> Loading files...')

    // find all files which match the file pattern
    const allFilesPath = getFilesPath(path.resolve(configs.src), configs?.fileTypes || '.*', { ignorePaths: [...configs.ignore?.folders, configs.output], ignoreTypes: configs.ignore?.fileTypes, quiet });
    // read all files content
    const allFilesContent = getFilesContent(allFilesPath);

    globalState.setFilesContent(allFilesContent);

    console.log('> Loading files finished, files amount: ', allFilesPath.length);

  } catch (e) {
    console.log('> Loading config file error')

    throw e;
  }
};

exports.init = run;