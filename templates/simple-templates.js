const componentTemplate = (componentName) => `import React from 'react';
import './${componentName}.css';

const ${componentName} = () => {
  return (
    <div className="wrapper">
    </div>
  );
};

export default ${componentName};`;

const apiExampleTemplate = `import axios from 'axios';
export const axiosInstance = axios.create();

//How use in route components
//import { getPlanet } from "../../../utils/api";
//
//React.useEffect(() => {
//  getPlanet()
//    .then(({data}) => {
//      console.log(data)
//    })
//})
export const getPlanet = () => {
  return axiosInstance.get('/api/planets/1/')
};`;

const appUrlsTemplate = `const frontendUrl = props.frontendUrl
  ? \`\${props.frontendUrl}/\${PROJECT_NAME}\` // если мы на стенде
  : BASE_PATH; // если мы разрабатываем локально
const backendUrl = props.backendUrl
  ? \`\${props.backendUrl}\${API_POSTFIX}\` // если мы на стенде
  : \`\${API_PREFIX}\${API_POSTFIX}\`; // если мы разрабатываем локально\n
 `;

const prefixTemplate = (projectName) => `export const PROJECT_NAME = '${projectName}';
export const BASE_PATH = \`/ui/cross/tsac/\${PROJECT_NAME}\`;
export const API_PREFIX = '/ui-api-web/cross/tsac';
export const API_REQUIRED_PATH = 'api';
export const API_POSTFIX = \`/\${PROJECT_NAME}/\${API_REQUIRED_PATH}/v1\`;
`;

const importConstantsForRootComponentTemplate = `import { PROJECT_NAME, BASE_PATH, API_POSTFIX, API_PREFIX } from "./constants";\n\n`

module.exports = {
  componentTemplate,
  apiExampleTemplate,
  appUrlsTemplate,
  importConstantsForRootComponentTemplate,
  prefixTemplate,
}