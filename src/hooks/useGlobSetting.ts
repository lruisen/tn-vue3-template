import { getAppEnvConfig } from '@/utils/env';
import type { GlobConfig } from '/#/config';
export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_SERVER_BASEURL,
    VITE_GLOB_API_PREFIX,
    VITE_GLOB_APP_PUBLIC_BASE,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_WX_APPID,
  } = getAppEnvConfig();

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }

  const glob: Readonly<GlobConfig> = {
    // 标题
    title: VITE_GLOB_APP_TITLE,
    // 接口地址
    baseUrl: VITE_GLOB_SERVER_BASEURL,
    // api 接口前缀
    urlPrefix: VITE_GLOB_API_PREFIX,
    // 网站公共路径
    publicPath: VITE_GLOB_APP_PUBLIC_BASE,
    // 项目简称
    shortName: VITE_GLOB_APP_SHORT_NAME,
    // 微信小程序的 APPID
    wxAppid: VITE_GLOB_WX_APPID,
  };

  return glob as Readonly<GlobConfig>;
};
