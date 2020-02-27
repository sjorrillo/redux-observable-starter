import merge from 'lodash/merge';

import envVal from './env-val';

const baseEnvironment = 'production'; // base config environment

const getEnvironment = () => {
  const nodeEnv = envVal('NODE_ENV', baseEnvironment);
  if (!nodeEnv.match(/^development$|^integration$|^production$/i)) return baseEnvironment;
  return nodeEnv;
};

export const createConfig = (setupEnvFn = () => {}) => {
  const nodeEnv = getEnvironment();
  const setupConfig = {
    env: nodeEnv.toLowerCase(),
    isDevelopment: /development/i.test(nodeEnv),
    isIntegration: /integration/i.test(nodeEnv),
    isProduction: /production/i.test(nodeEnv),
  };

  const { baseConfig = {}, envConfig = {} } = setupEnvFn(setupConfig, baseEnvironment);
  return merge(baseConfig, envConfig, setupConfig);
};
