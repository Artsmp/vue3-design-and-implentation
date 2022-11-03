function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = fn.length + args.join(',');
    if (cache[key]) {
      return cache[key];
    } else {
      return (cache[key] = fn.apply(this, args));
    }
  };
}

var add = function (a, b, c) {
  return a + b + c;
};

var memoizedAdd = memoize(add);

console.time('use memoize');
for (var i = 0; i < 100000; i++) {
  memoizedAdd(1, 2, 3);
}
console.timeEnd('use memoize');

console.time('not use memoize');
for (var i = 0; i < 100000; i++) {
  add(1, 2, 3);
}
console.timeEnd('not use memoize');
