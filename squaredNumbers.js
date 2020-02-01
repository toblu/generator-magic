function* squaredNumbersGenerator(max) {
  let x = 0;
  while (x < max) {
    x++;
    yield x * x;
  }
}

const squaredNumbers = squaredNumbersGenerator(10);

for (const number of squaredNumbers) {
  console.log(number);
}
