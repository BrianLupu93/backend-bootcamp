const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "starter.txt"), "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

fs.writeFile(path.join(__dirname, "reply.txt"), "Nice to meet you", (err) => {
  if (err) throw err;
  console.log("Write complete");
});

fs.appendFile(path.join(__dirname, "test.txt"), "Testing test", (err) => {
  if (err) throw err;
  console.log("Append complete");
});
// exit on uncaught errors

process.on("uncaughtException", (err) => {
  console.error(`There was an uncaught error: ${err}`);
  process.exit(1);
});