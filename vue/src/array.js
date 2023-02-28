// 取数组原型
const arrayProperty = Array.prototype;
// create方法创建一个新对象，将传入的对象作为新对象的原型方法
export const arrayMethods = Object.create(arrayProperty);

export const arrayToPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse', 'sort'];

arrayToPatch.forEach(method => {
  const copied = arrayProperty[method];
  Object.defineProperty(arrayMethods, method, {
    value: function customFn (...args) {
      console.log('拦截');
      return copied.apply(this, args);
    },
    configurable: true,
    writable: true,
    enumerable: true
  })
});
