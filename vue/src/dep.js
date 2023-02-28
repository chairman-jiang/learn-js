import { remove } from '../utils'

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(target) {
    this.subs.push(target)
  }
  removeSub(item) {
    remove(this.subs, item);
  }
  depend() {
    if (globalThis.target) {
      this.addSub(Object.assign({}, globalThis.target));
    }
  }
  notify() {
    const copiedSubs = this.subs.slice();
    copiedSubs.forEach(t => t.update());
  }
}

export default Dep;
