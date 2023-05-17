const fs = require('fs');
const path = require('path');
const { apiExampleTemplate } = require('../templates/simple-templates');

const apiConfig = () => {
  const srcPath = [__dirname, '..', 'src'];
  const apiPath = ['utils', 'api'];
  // создание директорий src/utils/api
  apiPath.forEach(currentPath => {
    const currentResolvePath = path.resolve(...srcPath, currentPath);
    if (!fs.existsSync(currentResolvePath)) {
      fs.mkdirSync(currentResolvePath);
    };
    srcPath.push(currentPath);
  });

  fs.writeFileSync(path.resolve(...srcPath, `index.ts`), apiExampleTemplate);
}

module.exports = {
  apiConfig,
}