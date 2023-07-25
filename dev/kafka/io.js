import { createInterface } from "readline";

const readLine = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readLineAsync = (msg) => {
  return new Promise((resolve) => {
    readLine.question(msg, (userResponse) => {
      resolve(userResponse);
    });
  });
};

export default readLineAsync;
