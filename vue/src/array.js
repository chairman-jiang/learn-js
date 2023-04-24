import { def } from '../utils';
// 取数组原型
const arrayProperty = Array.prototype;
// create方法创建一个新对象，将传入的对象作为新对象的原型方法
export const arrayMethods = Object.create(arrayProperty);

export const arrayToPatch = ['push', 'pop', 'unshift', 'shift', 'splice', 'reverse', 'sort'];

arrayToPatch.forEach(method => {
  const copied = arrayProperty[method];
  def(arrayMethods, method, function customFn(...args) {
    const ob = this.__ob__;
      console.log('拦截');
      let inserted; 
      switch (method) {
        // 如果是新增的，对新增项进行响应式代理
        case 'push': // [{ name: 1 }]
        case 'unshift': // [{ name: 1 }]
          // args 新增的值
          inserted = args;
          break;
        // 如果是替换，将新值进行响应式代理
        case 'splice': // [ 0, 1, { name: 1 }] -> slice 取最后的值 [{ name: 1 }]
          inserted = args.slice(2);
          break;
      }
      // args 是一个数组 -> 调用 observeArray
      if (inserted) ob.observeArray(inserted);
      // 拦截器触发依赖
      ob.dep.notify();
      return copied.apply(this, args);
  });
});
