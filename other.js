
// let timeCount = 6;

// let timer = null;

// function time() {
//   timer = setInterval(() => {
//     console.log(timeCount)
//     --timeCount;
//     if (timeCount === 0) {
//       clearInterval(timer)
//       timeCount = 6
//       time()
//     }
//   }, 1000);
// }

// time();

// function clearSame(list) {
//   let newList = list.slice(0, 1);
//   list.forEach(element => {
//     let i = 0;
//     for (;i<newList.length; i++) {
//       if (element === newList[i]) {
//         break;
//       }
//     }
//     if (i === newList.length) {
//       newList.push(element)
//     }
//   });
//   return newList;
// }

// console.log(clearSame(['123', '2', '123', '1', '2']))

function foo () {
  getName = function() {
    console.log(1);
  }
}

foo.getName = function () {
  console.log(2);
}

foo.prototype.getName = function () {
  console.log(3);
}


function isPlainObject (val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

const push = Array.prototype.push;

Array.prototype.push = function(item, key) {
	if (isPlainObject(item)) {
		let index = this.findIndex(t => t[key] === item[key]);
    if (index > 0) {
      this.splice(index, 1, item)
    } else {

    }
	} else {
    
  }
}
