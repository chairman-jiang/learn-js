import { isFunction, parsePath } from "../utils";

class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.lazy = options.lazy;
    if (isFunction(expOrFn)) {
      this.getter = expOrFn
    } else {
      // 如果$watch 传入的字符串就要匹配对象属性路径
      this.getter = parsePath(expOrFn);
    }
    // 如果是computed就不要去调用get方法了, 避免触发defineProperty中的getter去收集依赖了
    this.value = this.lazy ? undefined : this.get()
  }
  get() {
    let value;
    try {
      // 去触发getter, 收集依赖(这个watcher)
      value = this.getter.call(this.vm, this.vm);
    } catch(error) {
      throw error;
    } finally {
      
    }
    return value;
  }
}

export default Watcher;
