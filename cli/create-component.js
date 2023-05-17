const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { componentTemplate } = require('../templates/simple-templates');

const args = minimist(process.argv);

const srcPath = [__dirname, '..', 'src']; // путь до папки src текущего проекта
const arrPath = args.path.split('/'); // разбиваем путь из аргумента командной строки на массив
const componentName = arrPath[arrPath.length - 1]; // последний элемент - название компонента

// создание директорий из аргумента (при необходимости)
const currentArray = [];
arrPath.forEach(element => {
  currentArray.push(element);
  const currentResolvePath = path.resolve(...srcPath, ...currentArray);
  if (!fs.existsSync(currentResolvePath)) { // проверка - существует такая директория или нет?
    fs.mkdirSync(currentResolvePath); // если нет, то создаем новую
  }
});

const componentPath = [...srcPath, ...arrPath];

// Создание файла компонента
const componentCode = componentTemplate(componentName);
fs.writeFileSync(path.resolve(...componentPath, `${componentName}.jsx`), componentCode);

// Создание index.ts
const indexCode = `export { ${componentName} as default } from './${componentName}';`;
fs.writeFileSync(path.resolve(...componentPath, 'index.ts'), indexCode);