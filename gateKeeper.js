const rl = require("readline");

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

function* gateKeeper() {
  console.log(
    "I am the gate keeper, you must answer the following questions in order to pass!"
  );

  const name = yield "What's your name?";
  console.log("Your name is:", name);

  const age = yield "How old are you?";
  console.log("Your age is:", age);

  while (true) {
    const language = yield "Which is the best programming language in the world?";
    console.log("You said", language);

    if (language.toLowerCase() === "javascript") {
      console.log("That is correct! You may pass");
      return;
    }
    console.log("That is wrong!!! Try again!");
  }
}

const nextQuestion = question => {
  const { value, done } = question;
  if (done) {
    // The generator has finished, close the connection
    readline.close();
    return;
  }
  readline.question(`${value}\n`, answer => {
    if (answer === "cancel") {
      // Terminate the generator
      nextQuestion(keeper.return());
    } else {
      // Get next question
      nextQuestion(keeper.next(answer));
    }
  });
};

const keeper = gateKeeper();
nextQuestion(keeper.next());
