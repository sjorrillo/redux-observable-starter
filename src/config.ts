import { createConfig } from './utilities/create-config';

export default createConfig((setupConfig, baseEnvironment) => {
  const baseConfig = {}; // require(`./environments/${baseEnvironment}`); // eslint-disable-line
  const envConfig = setupConfig.env === baseEnvironment ? {} : require(`./environments/${setupConfig.env}`); // eslint-disable-line
  return {
    baseConfig,
    envConfig,
  };
});
