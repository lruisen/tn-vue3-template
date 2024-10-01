import { getConfigFileName } from '@/utils';
import type { GlobEnvConfig } from '/#/config';

export const getAppEnvConfig = () => {
  const ENV_NAME: string = getConfigFileName(import.meta.env);

  // #ifdef H5
  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : (window[ENV_NAME] as unknown as GlobEnvConfig);
  // #endif

  // #ifndef H5
  const ENV = import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : (uni[ENV_NAME] as unknown as GlobEnvConfig);
  // #endif

  const { VITE_GLOB_APP_SHORT_NAME } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }

  return { ...ENV };
};
