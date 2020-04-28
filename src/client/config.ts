import { createConfig } from './common/utilities/create-config';

export default createConfig((setupConfig, baseEnvironment) => {
  const { [baseEnvironment]: baseConfig, ...restSettings } = require('./environments/*.ts');
  const envConfig = setupConfig.env === baseEnvironment ? {} : restSettings[setupConfig.env];
  return {
    baseConfig,
    envConfig,
  };
});
