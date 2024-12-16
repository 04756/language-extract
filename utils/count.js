const { parse, visit } = require('recast');
const path = require('path');
const { visitStringLiteral, visitTemplateElement } = require('./recast');
const { getState } = require('../stores/global');
const babelParser = require("recast/parsers/babylon");

const count = (path, content, quiet) => {
  try {
    const ast = parse(content, {
      parser: babelParser
    });
    visit(ast, {
      visitStringLiteral: visitStringLiteral,
      visitTemplateElement: visitTemplateElement,
      visitLiteral: visitStringLiteral,
    })
  } catch (e) {
    console.error('> loading file error: ', path, quiet ? '' : e);
  }
}

const run = ({ quiet }) => {
  // read config json
  try {
    const allFilesContent = getState()?.filesContent;

    for (let filePath in allFilesContent) {
      count(filePath, allFilesContent[filePath], quiet);
    }

    const globalState = getState();

    console.log('> All files counted, amount: ', globalState?.langsExtract.length);

  } catch (e) {
    throw e;
  }
};

exports.count = run;