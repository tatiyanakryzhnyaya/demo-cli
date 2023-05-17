const proxyConfig = (proxy) => {
  const fs = require('fs');
  const path = require('path');
  
const targetProxyCode = `const proxyTarget = '${proxy}';
module.exports = {
  proxyTarget
};`

  fs.writeFileSync(path.resolve('config/', 'dev-server-proxy-target.js'), targetProxyCode);
}

module.exports = {
  proxyConfig
};
