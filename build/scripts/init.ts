import { runBuildConfig } from './buildConf';
import colors from 'picocolors';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);
    const isH5 = argvList.includes('--output=h5');

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      runBuildConfig(isH5);
    }

    console.log(`✨ ${colors.cyan(`[app.config.ts]`)} file initialization successfully!\n`);
  } catch (error) {
    console.log(colors.red('config file initialization error:\n' + error));
    process.exit(1);
  }
};

runBuild();
