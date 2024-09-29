import { getEnvConfig, getRootPath } from './utils';
import { getConfigFileName } from '@/utils';
import fs, { writeFileSync } from 'fs-extra';
import colors from 'picocolors';
import pkg from '../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '@/utils';

interface CreateConfigOptions {
  configName: string;
  config: any;
  configFileName?: string;
  output?: string;
}

const getConfigStr = (options: CreateConfigOptions) => {
  const { configName, config, output } = options;

  var globalThis = global;

  if (output === 'h5') {
    const windowConf = `${global[configName]}`;
    // Ensure that the variable will not be modified
    let configStr = `${windowConf}=${JSON.stringify(config)};`;
    configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty("${global}", "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');

    return configStr;
  } else {
    const conf = `${global[configName]}`;
    let configStr = `${conf}=${JSON.stringify(config)};`;
    configStr += `
      Object.freeze(${conf});
      Object.defineProperty("${global}", "${configName}", {
        configurable: false,
        writable: false,
      });
      export default ${conf};
    `;

    return configStr;
  }
};

const createConfig = (options: CreateConfigOptions) => {
  const { configFileName, output } = options;

  // const OUTPUT_DIR = `src/build/${output}`;
  const OUTPUT_DIR = `src`;

  try {
    let configStr = getConfigStr(options);

    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error));
  }
};

export const runBuildConfig = (output: string = 'h5') => {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({
    config,
    configName: configFileName,
    configFileName: GLOB_CONFIG_FILE_NAME,
    output,
  });
};
