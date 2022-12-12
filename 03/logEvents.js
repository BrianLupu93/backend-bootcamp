const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `date:${dateTime}\t id:${uuid()}\ message:${message}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }

    // testing
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    // await fsPromises.readFile(path.join(__dirname, "logEvents.txt"), {
    //   encoding: "utf8",
    // });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
