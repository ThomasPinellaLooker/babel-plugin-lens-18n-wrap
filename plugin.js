require('babel-types');

export default function({types: t}) {
  const i18nAttrs = [
    "placeholder",
    "label"
  ];
  function wrapI18n(path) {
    const content = path.node.value;
    path.replaceWith(
      t.jSXExpressionContainer(
        t.callExpression(
          t.memberExpression(
            t.identifier('I18n'), t.identifier('t')
          ), [t.StringLiteral(content)]
        )
      )
    )
  }
  return {
    visitor: {
      JSXText(path) {
        if (path.node.value.match(/\S/)) {
          wrapI18n(path)
        }
      },
      StringLiteral(path) {
        if (path.parent.type === 'JSXAttribute' &&
            i18nAttrs.includes(path.parent.name.name)) {
          wrapI18n(path)
        }
      }
    }
  }
};
