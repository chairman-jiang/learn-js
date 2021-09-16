class Subject {
  constructor() {
    this.subscriber = [];
    this.state = ''
  }

  attach(police) {
    this.subscriber.push(police);
  }

  setState(newState) {
    this.state = newState;
    this.subscriber.forEach(p => p.update(newState))
  }
}

class Observer {
  update(msg) {
    console.log(msg);
  }
}

let people = new Subject();

let police = new Observer();

people.attach(police);

people.setState('失业了')

class MyEvent {
  constructor() {
    this.queue = {};
  }
  on(eventName, eventFn) {
    
  }
  emit(eventName) {}
}
