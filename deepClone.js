let obj = {
  name: 'qwe',
  array: [],
  bools: true,
  date: new Date,
  reg: /\./,
  sub: {}
};


let arr = [1, 2];

console.log(arr.constructor);

for (const key in arr) {
  console.log(arr[key]);
}

function deepClone(obj) {
  if (obj === null) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj

  let newObj = new obj.constructor

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }
  return newObj;
}

console.log(deepClone(obj));
