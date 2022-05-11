
function debounce(time, callback) {
  let timer = null;
  return function(event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(event)
    }, time);
  }
}

function throttle(time, callback) {
  let flag = true;
  return function(...arg) {
    if (!flag) return false;
    flag = false; 
    setTimeout(() => {
      callback.apply(this, arg);
      flag = true
    }, time);
  }
}

// window.addEventListener('scroll', function() {
//   console.log('1234')
// })

function Neil() {
  this.sayMyName = function() {
    console.log('neil')
  }
}

const n = new Neil()

console.log(n.valueOf(), 'm')
