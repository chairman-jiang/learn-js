export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isArray(val) {
  return Array.isArray(val)
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export function isPromise(p) {
  return p !== null && p !== undefined && typeof p.then === 'function' &&typeof p.catch === 'function';
}

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export const hasProto = '__proto__' in {};

export function def(target, key, val, enumerable) {
  Object.defineProperty(target, key, {
    value: val,
    writable: true,
    enumerable: !!enumerable,
    configurable: true
  })
}

// 简单匹配Object namespace 层级规则 \w表示匹配_a-zA-Z  [^] 表示不在范围内的字符(取反)
const bailRE = /[^\w.$]/
export function parsePath(path) {
  if (bailRE.test(path)) return;
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]]
    }
    return obj;
  }
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) return arr.splice(index, 1);
  }
}