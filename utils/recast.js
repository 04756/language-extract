const { getState } = require("../stores/global");
const { types } = require('recast');
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

    // if in JSXElment
    if (tnt.JSXElement.check(parent.node)) {
      path.replace(astBuilder.blockStatement([newText]));
      this.traverse(path);
      return false;
    }

    path.replace(newText);
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

function replaceTemplateElement(path) {
  const text = path.node.value?.raw;
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

    const globalState = getState();
    globalState.addLangs(text);
    console.log(text);

    parent.expression.push(newText);
    this.traverse(path);
    return false;
  }
  this.traverse(path);
}


exports.visitStringLiteral = visitStringLiteral;
exports.replaceStringLiteral = replaceStringLiteral;
exports.visitTemplateElement = visitTemplateElement;
exports.replaceTemplateElement = replaceTemplateElement;