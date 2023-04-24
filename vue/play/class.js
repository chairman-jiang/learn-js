function Person(price, count) {
  this.price = price;
  this.count = count;
}

Object.definePropertie(Person.prototype, 'totalAmount', {
  configurable: false,
  enumerable: false,
  writable: false,
  get() {
    return this.count * this.price
  }
});

const p = Person(11, 1)
console.log(p.totalAmount)


