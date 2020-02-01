const fetch = require("node-fetch");
const usersUri = "https://jsonplaceholder.typicode.com/users";
const todosUri = "https://jsonplaceholder.typicode.com/todos";

function getUsersWithTodosUsingPromises() {
  return Promise.all([fetch(usersUri), fetch(todosUri)])
    .then(responses => {
      return Promise.all(responses.map(response => response.json()));
    })
    .then(([users, todos]) => {
      return users.map(user => ({
        name: user.name,
        todos: todos
          .filter(todo => todo.userId === user.id)
          .map(todo => ({ title: todo.title, done: todo.done }))
      }));
    });
}

const runAsync = require("./runAsync");

function* getUsersWithTodos() {
  const responses = yield Promise.all([fetch(usersUri), fetch(todosUri)]);
  const [users, todos] = yield Promise.all(
    responses.map(response => response.json())
  );
  const usersWithTodos = users.map(user => ({
    name: user.name,
    todos: todos
      .filter(todo => todo.userId === user.id)
      .map(todo => ({ title: todo.title, done: todo.done }))
  }));

  console.log(JSON.stringify(usersWithTodos, null, 2));
  return usersWithTodos;
}

runAsync(getUsersWithTodos);

module.exports = { getUsersWithTodos, getUsersWithTodosUsingPromises };
