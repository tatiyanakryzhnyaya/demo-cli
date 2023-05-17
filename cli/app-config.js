const commander = require('commander'),
  { prompt } = require('inquirer'),
  fs = require('fs');
const { prefixConfig } = require('./prefix-config');
const { proxyConfig } = require('./proxy-config');
const { apiConfig } = require('./api-config');
const { urlConfig } = require('./url-config');
const { exec } = require("child_process");
const path = require('path');
const package = require('../package.json');

commander
  .version('1.0.0')
  .description('Configuration files creator.');

commander
  .command('add-prefix-nginx')
  .action((name, cmd) => {
    prompt([
      {
        type: 'input',
        name: 'prefixNginx',
        message: '(То значение, которое вы указывали в Project Name при создании вашего проекта. Это значение должно быть уникальным для вашей системы. Не используйте сервисные значения.)\nPrefix Nginx: ',
      },
    ]).then((options) => {
      if (
        options.prefixNginx
      ) {
        const packageBuffer = {...package};
        packageBuffer.name = `@inno/${options.prefixNginx}`;
        fs.writeFileSync(path.resolve(...[__dirname, '..'], 'package.json'), JSON.stringify(packageBuffer));
        prefixConfig(options.prefixNginx);
        console.log(`Nginx ${options.prefixNginx} created`);
      } else {
        const prefixByDefault = package.name.split('/')[1];
        prefixConfig(prefixByDefault);
        console.log(`Nginx ${prefixByDefault} created`);
      }
    });
  });
 
commander.command('add-proxy-backend-url')
  .action((name, cmd) => {
    prompt([
      {
        type: 'input',
        name: 'proxy',
        message: '(Ссылка на бекенд сервиса. Необходим для локальной разработки. На указанные url будут просировать запросы при разработке.)\nProxy url: ',
      },
    ]).then((options) => {
      if (
        options.proxy
      ) {
        proxyConfig(options.proxy)
        console.log(`Proxy был изменен на ${options.proxy}. Перезапустите devServer`);
      }
    });
  });

commander
  .command('add-api')
  .action((name, cmd) => {
    prompt([
      {
        type: 'confirm',
        name: 'api',
        message: 'Будет установлен axios. Вы можете отменить установку. Хотите продолжить?',
      },
    ]).then((options) => {
      if (
        options.api
      ) {
        console.log('Идет установка axios...')
        exec('npm install axios', (error, stdout, stderr) => {
          if(error) {
            throw error
          } else {
            console.log('Axios установлен');
            apiConfig();
          }
        });
      }
    });
  });

commander
  .command('init-base-settings-app')
  .action((name, cmd) => {
    prompt([
      {
        type: 'input',
        name: 'prefixNginx',
        message: '(То значение, которое вы указывали в Project Name при создании вашего проекта. Это значение должно быть уникальным для вашей системы. Не используйте сервисные значения.)\nPrefix Nginx: ',
      },
      {
        type: 'input',
        name: 'proxy',
        message: '(Ссылка на бекенд сервиса. Необходим для локальной разработки. На указанные url будут просировать запросы при разработке.)\nBackend url: ',
      },
      {
        type: 'confirm',
        name: 'settingsUrl',
        require,
        message: 'В root.component будет добавлена настройка url',
      },
      {
        type: 'confirm',
        name: 'api',
        message: 'Будет установлен axios. Вы можете отменить установку и установить позже выполнив команду в терминале npm run add-api. Хотите продолжить?',
      },
    ]).then((options) => {
      if (
        options.prefixNginx
      ) {
        prefixConfig(options.prefixNginx);
        console.log(`Nginx ${options.prefixNginx} created`);
      } else {
        const prefixByDefault = package.name.split('/')[1];
        prefixConfig(prefixByDefault);
        console.log(`Nginx ${prefixByDefault} created`);
      }

      if (options.settingsUrl) {
        urlConfig();
      }

      if (
        options.api
      ) {
        console.log('Идет установка axios...')
        exec('npm install axios', (error, stdout, stderr) => {
          if(error) {
            throw error
          } else {
            console.log('Axios установлен');
            apiConfig();
          }
        });
      }

      if (
        options.proxy
      ) {
        proxyConfig(options.proxy)
        console.log(`Proxy был изменен на ${options.proxy}.\nЕсли devServer уже запущен, необходимо перезапустить`);
      }
    });
  });

commander.parse(process.argv);