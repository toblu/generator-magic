function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

const gen = simpleGenerator();

console.log(gen.next());
// { value: 1, done: false }
console.log(gen.next());
// { value: 2, done: false }
console.log(gen.next());
// { value: 3, done: false }
console.log(gen.next());
// { value: 4, done: true }
