import Dep from './dep';
import { arrayMethods } from './array';
import { isArray, isObject, hasProto, def, hasOwn } from '../utils';

const arrayKeys = Object.getOwnPropertyNames(arrayMethods);
console.log(arrayKeys, 'arrayKeys');

class Observer {
  constructor(value) {
    this.value = value;
    // 兼容数组收集依赖与更新，
    this.dep = new Dep();
    // 
    def(value, '__ob__', this);
    if (isArray(value)) {
      const resetArrayPropertyFn = hasProto ? this.setProto : this.patchCopyAttr;
      // 只有对需要变为响应式代理的数组进行原型方法覆盖，如果浏览器不支持__proto__，就直接讲重写的数组方法添加到该数据的属性上
      resetArrayPropertyFn(value);
      // 对数组进行代理
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i], obj[keys[i]]);
    }
  }

  setProto(target) {
    target.__proto__ = arrayMethods;
  }

  patchCopyAttr(target) {
    for (let i = 0; i < arrayKeys.length; i++) {
      const key = arrayKeys[i];
      def(target, key, arrayMethods[key]);
    }
  }

  observeArray(value) {
    for (let i = 0; i < value.length; i++) {
      observe(value[i])
    }
  }
}

function observe(value) {
  if (!isObject(value)) return;
  let ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else {
    ob = new Observer(value);
  }
  return ob;
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  // 递归
  const childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
      }
      return val;
    },
    set(newVal) {
      console.log('setter', newVal);
      if (val === newVal) return;
      val = newVal
      dep.notify();
    }
  })
}
const obj = {
  name: 'neil',
  subs: [{ name: 'karl' }]
}

new Observer(obj);

function dependency(obj, key) {
  globalThis.target = {
    componentName: 'default',
    update() {
      console.log('render')
    }
  }
  console.log(obj[key]);
  globalThis.target = undefined;
}

dependency(obj, 'name');

setTimeout(() => {
  obj.name = 'karl';
  obj.subs.push({ name: 'max' })
}, 1000);

