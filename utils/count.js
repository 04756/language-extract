const { parse, visit } = require('recast');
const path = require('path');
const { visitStringLiteral, visitTemplateElement } = require('./recast');
const { getState } = require('../stores/global');

const count = (path, content) => {

  try {
  const ast = parse(content);

    visit(ast, {
      visitStringLiteral: visitStringLiteral,
      visitTemplateElement: visitTemplateElement,
      visitLiteral: visitStringLiteral,
    })
  } catch (e) {
    throw e;
  }
}

const run = () => {
  // read config json
  try {
    const allFilesContent = getState()?.filesContent;

    for (let filePath in allFilesContent) {
      count(filePath, allFilesContent[filePath]);
    }

    const globalState = getState();

    console.log('> All files counted, amount: ', globalState?.langsExtract.length);

  } catch (e) {
    throw e;
  }
};

exports.count = run;