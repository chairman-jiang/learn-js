// https://promisesaplus.com

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 对x取then报错的情况是
 * Object.defineProperty(x, 'then', {
    get() {
      throw new Error('')
    }
  })
 */

// 判断then中return的返回值是不是一个Promise, 或者是普通值
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle datected for promise #<Promise>'));
  }
  // 判断是否是Promise
  // typeof x === 'object' && x !== null || typeof x === 'function'
  if (typeof x === 'object' || typeof x === 'function') {
    if (x === null) {
      return resolve(x);
    }
    let then;
    try {
      then = x.then;
    } catch (error) {
      reject(error);
    }
    if (typeof then === 'function') {
      let called = false;
      then.call(x, y => {
        // 如果已经调用过resolve了, 不用重复调用
        if (called) return;
        called = true;
        // y 也可能是一个Promise, 防止一直then形参一直是promise,此处需要递归
        resolvePromise(promise2, y, resolve, reject);
      }, r => {
        if (called) return;
        called = true;
        reject(r);
      })
    } else {
      // 如果then不是函数, 当成普通值
      resolve(x);
    }
  } else {
    // x是普通值
    resolve(x);
  }
};

class Promisex {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;

  value = null;
  reason = null;

  onFulfilledList = [];
  onRejectedList = [];

  resolve (val) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;
      while(this.onFulfilledList.length) {
        this.onFulfilledList.shift()();
      }
    }
  }

  reject (err) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = err;
      while(this.onRejectedList.length) {
        this.onRejectedList.shift()();
      }
    }
  }
  

  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected 变为可选
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    const promise2 = new Promisex((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledList.push(() => {
          queueMicrotask(() => {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          });
        });
        this.onRejectedList.push(() => {
          queueMicrotask(() => {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          });
        });
      } else if (this.status === FULFILLED) {
        // 使用settimeout是因为,函数执行中,无法在初始化前找到promise2
        queueMicrotask(() => {
          // 早内部添加try catch是因为, 上面executor添加的try catch 无法捕获内部异步错误
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
    });

    return promise2;
  }

  catch() {}

  static resolve(parameter) {
    if (parameter instanceof Promisex) {
      return parameter;
    }
    return Promisex(resolve => {
      resolve(parameter);
    })
  }

  static reject(reason) {
    return new Promisex((resolve, reject) => {
      reject(reason);
    });
  }

}

const p = new Promisex((resolve, reject) => {
  setTimeout(() => {
    resolve(1234);
  }, 1000);
});

p.then(res => {
  return new Promisex((resolve, reject) => {
    setTimeout(() => {
      Math.floor(Math.random * 1000) % 2 === 0 ? resolve() : reject();
    }, 1000);
  })
}, err => {

}).then(res => {

}, err => {

});


// const p1 = new Promise((resolve, reject) => {
//   resolve();
// });

// then会返回一个promise
// let p2 = p1.then(()=> {
//   // 这个then返回的结果(x)不能是p2, 这个p2是个promise实例,(无法在初始化前找到p2), 而且没有调用resolve,reject一直处在pending状态
//   return p2;
// });

// function nam(fn) {
//   const x = fn();
//   console.log(x);
// }

// let n = nam(()=> {
//   return n;
// })
