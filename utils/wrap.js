const { parse, visit } = require('recast');
const { writeFileContent } = require('./file');
const { replaceStringLiteral, replaceTemplateLiteral } = require('./recast');
const { getState } = require('../stores/global');
const { print } = require('recast');


const replace = (path, content) => {
  try {

  // find all chinese words in the content
  const ast = parse(content);

  // temperary not support template element
  visit(ast, {
    visitStringLiteral: replaceStringLiteral,
    visitTemplateLiteral: replaceTemplateLiteral,
    visitLiteral: replaceStringLiteral,
  })

  writeFileContent(path, print(ast).code);
  } catch (e) {
    console.log('> Extract and wrap words failed, file path: ', path)
    throw e;
  }
}

const run = () => {
  // read config json
    const allFilesContent = getState()?.filesContent;

    for (let filePath in allFilesContent) {
      replace(filePath, allFilesContent[filePath]);
    }

    console.log('> Extract and wrap words finished')

    return allFilesContent;


};

exports.wrap = run;