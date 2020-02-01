function runAsync(generatorFn) {
  const generator = generatorFn();
  runNext();

  function runNext(response) {
    const { value, done } = generator.next(response);

    // Generator has run to completion
    if (done) return;

    if (value.then) {
      // Generator yielded a promise
      value
        // pass resolved value back to generator
        .then(response => runNext(response))
        // pass any error back to generator
        .catch(error => generator.throw(error));
    } else {
      // yielded value is not a promise
      runNext(value);
    }
  }
}

module.exports = runAsync;
