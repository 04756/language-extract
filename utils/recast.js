const { getState } = require("../stores/global");
const { types, print, parse } = require('recast');
const astBuilder = types.builders
const tnt = types.namedTypes;
const { assignmentExpression, identifier, blockStatement, arrowFunctionExpression } = astBuilder;

function visitStringLiteral(path) {

  const text = path.node.value;
  const reg = /[\u4e00-\u9fa5]/g;
  const parent = path.parentPath;

  if (reg.test(text)) {
    // text which be wrapped function should not process
    if (tnt.CallExpression.check(parent.node)) {
      this.traverse(path);
      return false;
    }

    const globalState = getState();
    globalState.addLangs(text);
  }

  this.traverse(path);
}

function replaceStringLiteral(path) {

  const text = path.node.value;
  const reg = /[\u4e00-\u9fa5]/g;
  const parent = path.parentPath;
  if (reg.test(text)) {
    // text which be wrapped function should not process
    if (tnt.CallExpression.check(parent.node)) {
      this.traverse(path);
      return false;
    }
    // new text wrapped by function
    const newText = astBuilder.expressionStatement(astBuilder.callExpression(identifier('t'), [astBuilder.literal(text)]));
    // use recast.print replace ';'
    const expressionCode = print(newText).code.replace(/;$/, '');

    // if in JSXElment
    if (tnt.JSXElement.check(parent.node)) {
      // re parse expressionCode
      path.replace(astBuilder.blockStatement([parse(expressionCode).program.body[0]]));
      this.traverse(path);
      return false;
    }

    path.replace(parse(expressionCode).program.body[0]);
  }

  this.traverse(path);
}

function visitTemplateElement(path) {
  const text = path.node.value?.raw;
  const reg = /[\u4e00-\u9fa5]/g;
  const parent = path.parentPath;

  if (reg.test(text)) {
    // text which be wrapped function should not process
    if (tnt.CallExpression.check(parent.node)) {
      this.traverse(path);
      return false;
    }

    const globalState = getState();
    globalState.addLangs(text);
  }
  this.traverse(path);
}

function replaceTemplateLiteral(path) {
  const reg = /(?<!t\(|t\()[\u4e00-\u9fa5]+(?![^']*'\)|[^"]*"\))/g;


  const { node } = path;

  const originalStr = print(node).code;
  const result = originalStr.replace(reg, (match) => {
    return `\${t("${match}")}`;
  });

  if (result !== originalStr) {
    // replace old string template
    path.replace(
      parse(result)
    );
  }

  return false;

}


exports.visitStringLiteral = visitStringLiteral;
exports.replaceStringLiteral = replaceStringLiteral;
exports.visitTemplateElement = visitTemplateElement;
exports.replaceTemplateLiteral = replaceTemplateLiteral;