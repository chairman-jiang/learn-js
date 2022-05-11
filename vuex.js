class Store {
  constructor(options) {
    const store = this;
    const { dispatch, commit } = this;
    this.dispatch = function(type, payload) {
      return dispatch.call(store, type, payload);
    }
    this.commit = function(type, payload, options) {
      return commit.call(store, type, payload, options);
    }
  }

  dispatch() {
    console.log('dis -> ', this)
  }

  commit() {
    console.log('com ->', this)
  }
}

function Person(name) {
  const self = this;
  this.name = name;
  this.sayMyName = function () {
    return sayMyName.call(self)
  }
  function sayMyName() {
    console.log(`my name is ${this.name}`);
  }
}

const p = new Person('neil');
const { sayMyName } = p;

sayMyName()