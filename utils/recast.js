function visitStringLiteral(path) {
  const text = path.node.value;
  const reg = /[\u4e00-\u9fa5]/g;
  if (reg.test(text)) {
    console.log(text);
  }
  this.traverse(path);
}

function visitTemplateElement(path) {
  const text = path.node.value?.raw;
  const reg = /[\u4e00-\u9fa5]/g;
  if (reg.test(text)) {
    console.log(text);
  }
  this.traverse(path);
}

exports.visitStringLiteral = visitStringLiteral;
exports.visitTemplateElement = visitTemplateElement;