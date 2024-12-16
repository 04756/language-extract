const { parse, visit } = require('recast');
const { writeFileContent } = require('./file');
const { replaceStringLiteral, replaceTemplateLiteral, insertImport } = require('./recast');
const { getState } = require('../stores/global');
const { print } = require('recast');


const replace = (path, content, opts) => {
  try {

    // find all chinese words in the content
    const ast = parse(content);
    const { importFunction } = opts;
    // temperary not support template element
    visit(ast, {
      visitStringLiteral: replaceStringLiteral,
      visitTemplateLiteral: replaceTemplateLiteral,
      visitLiteral: replaceStringLiteral,
    })

    if (print(ast).code !== content) {
      // content has been changed
      insertImport(ast, {
        functionName: importFunction.functionName,
        functionAlias: importFunction.functionAlias,
        isDefault: importFunction.isDefault,
      }, importFunction.moduleName);
      writeFileContent(path, print(ast).code);
    }

  } catch (e) {
    console.error('> Extract and wrap words failed, file path: ', path)
    throw e;
  }
}

const run = () => {
  // read config json
  const allFilesContent = getState()?.filesContent;

  for (let filePath in allFilesContent) {
    replace(filePath, allFilesContent[filePath], {
      importFunction: getState().configs?.importFunction || {}
    });
  }

  console.log('> Extract and wrap words finished')

  return allFilesContent;


};

exports.wrap = run;