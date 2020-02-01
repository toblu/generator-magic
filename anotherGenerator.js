function* anotherGenerator() {
  const a = yield 1;
  yield a + 1;
  yield a + 2;
  return a + 3;
}

const gen = anotherGenerator();

console.log(gen.next());
// { value: 1, done: false }

console.log(gen.next(5));
// { value: 6, done: false }

console.log(gen.next());
// { value: 7, done: false }

console.log(gen.next());
// { value: 8, done: true }
