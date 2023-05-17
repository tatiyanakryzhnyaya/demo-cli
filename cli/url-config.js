const fs = require('fs');
const path = require('path');
const { appUrlsTemplate, importConstantsForRootComponentTemplate } = require('../templates/simple-templates');

const urlConfig = () => {
  const srcPath = [__dirname, '..', 'src'];

  const rootComponentTemplate = fs.readFileSync(`${path.resolve(...srcPath)}/root.component.tsx`, 'utf-8');
  // здесь начинается рендер
  // добавляем перед ним настройки урл
  const indexStartRenderFunc = rootComponentTemplate.lastIndexOf('return');
  let buffer = rootComponentTemplate.substring(0, indexStartRenderFunc) + appUrlsTemplate + rootComponentTemplate.substring(indexStartRenderFunc);

  // заканчиваются импорты и начинается функция
  const indexImportsEnd = rootComponentTemplate.lastIndexOf('export default function');
  buffer = buffer.substring(0, indexImportsEnd) + importConstantsForRootComponentTemplate + buffer.substring(indexImportsEnd);

  fs.writeFileSync(path.resolve(`${path.resolve(...srcPath)}`, 'root.component.tsx'), buffer);
}

module.exports = {
  urlConfig,
}