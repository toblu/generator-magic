jest.mock("node-fetch");

const {
  getUsersWithTodos,
  getUsersWithTodosUsingPromises
} = require("./todos");

const { usersResponse, todosResponse } = require("./__fixtures__");

const expectedValue = [
  {
    name: "User 1",
    todos: [
      {
        title: "Bar user 1",
        done: false
      },
      { title: "Foo user 1", done: true }
    ]
  },
  {
    name: "User 2",
    todos: [
      {
        title: "Foo user 2",
        done: false
      },
      { title: "Bar user 2", done: true }
    ]
  }
];

describe("getUsersWithTodos", () => {
  it("returns a list of users with todo items for each user", () => {
    const generator = getUsersWithTodos();
    generator.next();
    generator.next([]);
    const { value, done } = generator.next([usersResponse, todosResponse]);
    expect(value).toEqual(expectedValue);
    expect(done).toEqual(true);
  });
});

describe("getUsersWithTodosUsingPromises", () => {
  beforeEach(() => {
    const fetch = require("node-fetch");
    fetch.mockImplementation(url => {
      if (url.includes("/users")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(usersResponse)
        });
      } else if (url.includes("/todos")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(todosResponse)
        });
      }
    });
  });

  it("returns a list of users with todo items for each user", () => {
    getUsersWithTodosUsingPromises().then(value => {
      expect(value).toEqual(expectedValue);
    });
  });
});
