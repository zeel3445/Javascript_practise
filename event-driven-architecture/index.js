const fs = require("fs");
const os = require("os");
const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    this.emit("message", { message });
  }
}
const logger = new Logger();
const logFile = "./eventlog.txt";

const logToFile = (event) => {
  const logMessge = `${new Date().toISOString()}- ${event.message} `;
  fs.appendFileSync(logFile, logMessge);
};

logger.on("message", logToFile);

setInterval(() => {
  const memoryUsuage = (os.freemem / os.totalmem()) * 100;
  logger.log(`Current memory usuage: ${memoryUsuage.toFixed(2)}`);
}, 3000);

logger.log("Application started");
logger.log("Application event occured");
