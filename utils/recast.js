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

    // if in JSXElment
    if (tnt.JSXElement.check(parent.node)) {
      // use recast.print replace ';'
      const expressionCode = print(newText).code.replace(/;$/, '');
      // re parse expressionCode
      path.replace(astBuilder.blockStatement([parse(expressionCode).program.body[0]]));
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

function replaceTemplateLiteral(path) {
  const reg = /[\u4e00-\u9fa5]/g;


  const { node } = path;
  const pendingWraped = [];

  const quasis = node.quasis.map((element, index) => {
    const { value } = element;
    const { raw } = value;
    if (raw && reg.test(raw)) {
      console.log('in')
      // new text wrapped by function
      const newText = astBuilder.callExpression(identifier('t'), [astBuilder.stringLiteral(raw)]);
      pendingWraped.push({
        text: newText,
        index
      })
      return astBuilder.templateElement({
        raw: '',
        cooked: ''
      }, index === node.quasis?.length - 1);
    }
    return element;
  });

  const expressions = node.expressions;

  pendingWraped.map((item => {
    // insert new text in expressions
    expressions.splice(item.index, 0, item.text);
  }))

  // 替换原来的模板字符串节点
  path.replace(
    astBuilder.templateLiteral(quasis, expressions)
  );

  return false;

}


exports.visitStringLiteral = visitStringLiteral;
exports.replaceStringLiteral = replaceStringLiteral;
exports.visitTemplateElement = visitTemplateElement;
exports.replaceTemplateLiteral = replaceTemplateLiteral;