import { isArray } from './is';

/**
 * 将URL路径参数转为对象
 * @param {String} url 路径参数
 */
export const urlToObj = (url: string) => {
  return url.split('&').reduce((obj: Recordable, item) => {
    const [key, value] = item.split('=');
    obj[key] = value;
    return obj;
  }, {});
};

/**
 * 将对象转为URL路径参数
 * @param {Object} obj 对象
 */
export const objToUrl = (obj: Recordable) => {
  return Object.keys(obj).reduce((str, key) => {
    str += `${key}=${obj[key]}&`;
    return str;
  }, '');
};

/**
 * 解析URL Query参数，此函数仅在 H5 中有效
 * 主要针对 Hash 和 History 路由模式
 */
export const parseQuery = () => {
  const res: Recordable = {};

  try {
    const query = (location.href.split('?')[1] || '').trim().replace(/^(\?|#|&)/, '');
    if (!query) {
      return res;
    }

    query.split('&').forEach((param) => {
      const parts = param.replace(/\+/g, ' ').split('=');
      const key = decodeURIComponent(parts.shift() as string);
      const val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null;

      if (res[key] === undefined) {
        res[key] = val;
      } else if (isArray(res[key])) {
        res[key].push(val);
      } else {
        res[key] = [res[key], val];
      }
    });
  } catch (error) {
    console.error('Error parsing query:', error);
  }

  return res;
};
