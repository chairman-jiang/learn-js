/*
  进位计数制两大要素
  1.基数R(基本数码的个数, 逢R进1,基数R的数制称为R进制数)
   比如2进制 就是0和1两个数字
   10进制就是0~9 10个数字
   所以2进制的基数R 就是2
   10进制的基数R 就是10
  2.位权Wi(是指第i位上的数码的权重值,位权与数码所处的位置i有关)
   R^i
   (22.22)10 = 2*10^1 + 2*10^0 + 2*10^-1 + 2*10^-2
*/

console.log(foo())
function foo () {
  return bar();
  var bar = function () { return 5; };
  var bar = () => 6;
  var bar = (function(){ return 7; })();
  function bar () { return 8; }
}

var a = 5; 
function todo() {
  var a = 9;
  return function() {
    a = 7;
  };
}
todo()();
console.log(a);
function cusNew(fn, ...args) {
  if (typeof fn !== 'function') throw new Error('参数必须是函数')
  let self = Object.create(fn.prototype);
  const result = fn.apply(self, args);
  return Object.prototype.toString.call(result) === '[object Object]' ? result : self;
}

(function() {
  var greet = 'Hello Shuidi';
  var toGreet = [].filter.call(greet, function(element, index) {
  return index > 5; });
  console.log(toGreet);
}());

function Ani(name) {
   this.name = name
}

const s = cusNew(Ani, "neil");

console.log(s, s.name)


/*
  encodeURI 会替换除; , / ? : @ & = + $ - _ . ! ~ * ' ( ) #的所有的字符
  encodeURIComponent 会替换除A-Z a-z 0-9 - _ . ! ~ * ' ( )的所有的字符

  decodeURI 不能解码不能被encodeURI编码支持的字符
  decodeURIComponent 不能解码不能被encodeURIComponent编码支持的字符
*/
function decodeRecursion(code) {
  let decode;
  let run = true;
  while(run) {
    let cur = decodeURIComponent(decode || code);
    if (cur === decode) {
      run = false;
    } else {
      decode = cur;
    }
  }
  return decode;
}

const string = 'https://www.baidu.com/?test=1';
const encoded = encodeURIComponent(encodeURIComponent(string));

const decode = decodeRecursion(encoded);
console.log(decode)

