const object = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    let index = 0;
    const values = Object.values(this);
    return {
      next() {
        const obj = {
          value: values[index],
          done: index > values.length - 1
        }
        index++;
        return obj; 
      }
    }
  }
}


for (const iterator of object) {
  console.log(iterator, 'asd')
}
