const prefixConfig = (projectName) => {
  const { prefixTemplate } = require('../templates/simple-templates');
  const fs = require('fs');
  const path = require('path');

  const srcPath = [__dirname, '..', 'src'];

  // создание директории src/constants
  const currentResolvePath = path.resolve(...srcPath, 'constants');
  if (!fs.existsSync(currentResolvePath)) {
    fs.mkdirSync(currentResolvePath);
  };

  const prefixConfigCode = prefixTemplate(projectName);
  fs.writeFileSync(path.resolve('src/constants/', 'index.ts'), prefixConfigCode);
}

module.exports = {
  prefixConfig
};


