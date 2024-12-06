const { parse, visit } = require('recast');
const { getFileContent, getFilesPath, getFilesContent } = require('./file');
const path = require('path');
const { visitStringLiteral, visitTemplateElement } = require('./recast');

const replace = (content) => {
  // find all chinese words in the content
  const ast = parse(content);

  visit(ast, {
    visitStringLiteral: visitStringLiteral,
    visitTemplateElement: visitTemplateElement,
    visitLiteral: visitStringLiteral,
  })
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

    console.log('> Extract words...')

    for (let filePath in allFilesContent) {
      const content = replace(allFilesContent[filePath]);
    }

    return allFilesContent;

  } catch (e) {
    throw e;
  }
};

exports.extract = run;