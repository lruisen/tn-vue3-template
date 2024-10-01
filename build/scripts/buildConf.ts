import { getEnvConfig, getRootPath } from './utils';
import { getConfigFileName } from '@/utils';
import fs, { writeFileSync } from 'fs-extra';
import colors from 'picocolors';
import { GLOB_CONFIG_FILE_NAME } from '@/utils';

interface CreateConfigOptions {
  configName: string;
  config: any;
  configFileName?: string;
  isH5?: boolean;
}

const getConfigStr = (options: CreateConfigOptions) => {
  const { configName, config, isH5 } = options;

  const obj = isH5 ? 'window' : 'uni';
  const conf = `${obj}.${configName}`;
  let configStr = `${conf}=${JSON.stringify(config)};`;
  configStr += `
      Object.freeze(${conf});
      Object.defineProperty(${obj}, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');

  return configStr;
};

const createConfig = (options: CreateConfigOptions) => {
  const { configFileName, isH5 } = options;

  const OUTPUT_DIR = isH5 ? 'dist/build/h5' : 'src';

  try {
    let configStr = getConfigStr(options);

    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${configFileName}] - configuration file is build successfully!`));
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error));
  }
};

export const runBuildConfig = (isH5: boolean) => {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({
    config,
    configName: configFileName,
    configFileName: GLOB_CONFIG_FILE_NAME,
    isH5,
  });
};
