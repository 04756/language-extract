const { parse, visit } = require('recast');
const { getFileContent, getFilesPath, getFilesContent, writeFileContent } = require('./file');
const path = require('path');
const { replaceStringLiteral } = require('./recast');
const { getState } = require('../stores/global');
const { print } = require('recast');


const replace = (path, content) => {
  // find all chinese words in the content
  const ast = parse(content);

  // temperary not support template element
  visit(ast, {
    visitStringLiteral: replaceStringLiteral,
    // visitTemplateElement: replaceTemplateElement,
    visitLiteral: replaceStringLiteral,
  })

  writeFileContent(path, print(ast).code);
}

const run = () => {
  // read config json
  try {
    const configs = JSON.parse(getFileContent(path.resolve('./language-cli.config.json')));

    console.log('> Loading files...')

    // find all files which match the file pattern
    const allFilesPath = getFilesPath(path.resolve(configs.src), '*', configs.ignore);
    // read all files content
    const allFilesContent = getFilesContent(allFilesPath);

    console.log('> Loaded files...')

    console.log('> Extract and replace words...')

    for (let filePath in allFilesContent) {
      replace(filePath, allFilesContent[filePath]);
    }

    console.log('> Extract and wrap words finished')

    return allFilesContent;

  } catch (e) {
    throw e;
  }
};

exports.wrap = run;