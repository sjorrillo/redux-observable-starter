import merge from 'lodash/merge';

export interface IBaseConfig {
  env: string;
  isDevelopment: boolean;
  isIntegration: boolean;
  isProduction: boolean;
}

interface IAppSettings {
  name: string;
}

export interface IEnvironmentConfig {
  app: IAppSettings;
  apiUrl: string;
  i18nDebug: boolean;
}

type CreateConfigArgsType = (
  setupConfig: IBaseConfig,
  baseEnvironment: string
) => { baseConfig: IEnvironmentConfig; envConfig: IEnvironmentConfig };

const baseEnvironment = 'production'; // base config environment

const getEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV || baseEnvironment;
  if (!nodeEnv.match(/^development$|^integration$|^production$/i)) return baseEnvironment;
  return nodeEnv;
};

export const createConfig = (
  setupEnvFn: CreateConfigArgsType
): IEnvironmentConfig & IBaseConfig => {
  const nodeEnv = getEnvironment();
  const setupConfig = {
    env: nodeEnv.toLowerCase(),
    isDevelopment: /development/i.test(nodeEnv),
    isIntegration: /integration/i.test(nodeEnv),
    isProduction: /production/i.test(nodeEnv),
  };

  const { baseConfig = {}, envConfig = {} } = setupEnvFn(setupConfig, baseEnvironment);
  return merge(baseConfig, envConfig as any, setupConfig as any);
};
