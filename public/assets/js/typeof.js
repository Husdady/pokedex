const isString = string => typeof string === 'string',
  isNumber = number => typeof number === 'number',
  isBoolean = data => typeof data === 'boolean',
  isFunction = func => typeof func === 'function',
  isArray = array => Array.isArray(array),
  isEmptyArray = array => isArray(array) && array.length === 0,
  isUndefined = data => typeof data === 'undefined',
  isObject = obj => typeof obj === 'object',
  isEmptyObject = obj => isObject(obj) && Object.keys(obj).length === 0,
  isError = error => error instanceof Error;

export {
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isArray,
  isEmptyArray,
  isUndefined,
  isObject,
  isEmptyObject,
  isError
}