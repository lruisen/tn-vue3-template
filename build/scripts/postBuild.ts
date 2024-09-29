import pkg from '../../package.json';
import { runBuildConfig } from './buildConf';
import colors from 'picocolors';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    // Generate configuration file
    if (!argvList.includes('disabled-config')) {
      let output = argvList.filter((item) => item.startsWith('--output=')).shift();
      output = output ? output.replace('--output=', '') : 'h5';
      runBuildConfig(output);
    }

    console.log(`✨ ${colors.cyan(`[${pkg.name}]`)}` + ' - build successfully!');
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};

runBuild();
