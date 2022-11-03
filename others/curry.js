function curry(fn, ...args) {
  const length = fn.length;
  return function (...innerArgs) {
    const finalArgs = [...args, ...innerArgs];
    if (finalArgs.length < length) {
      return curry.apply(this, [fn, ...finalArgs]);
    }
    return fn.apply(this, finalArgs);
  };
}

function add(a, b) {
  return a + b;
}

const curAdd = curry(add, 1);
console.log(curAdd(2));
const curAdd2 = curry(add);
console.log(curAdd2(1, 2));

var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn('a', 'b', 'c'); // ["a", "b", "c"]
fn('a', 'b')('c'); // ["a", "b", "c"]
fn('a')('b')('c'); // ["a", "b", "c"]
fn('a')('b', 'c'); // ["a", "b", "c"]

const curry2 = (fn, ...args) =>
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  args.length >= fn.length // 这个判断很关键！！！
    ? // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
      fn(...args)
    : /**
       * 传入的参数小于原始函数fn的参数个数时
       * 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数） 的函数
       */
      (..._args) => curry2(fn, ...args, ..._args);
