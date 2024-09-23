/**
 * 将URL路径参数转为对象
 * @param url 路径参数
 */
export const urlToObj = (url: string) => {
  return url
    .split('?')[1]
    .split('&')
    .reduce((obj: Recordable, item) => {
      const [key, value] = item.split('=')
      obj[key] = value
      return obj
    }, {})
}
