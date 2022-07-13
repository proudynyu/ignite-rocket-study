
export const isEmptyObject = (obj: Array<any> | Object): boolean => {
  if (obj instanceof Array) {
    return !Boolean(obj.length)
  }
  return !Boolean(Object.keys(obj).length)
}