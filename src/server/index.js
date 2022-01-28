
const Server = require("./server.js");
process.env.IS_DEV = process.argv[2] == "dev" ? "." : ""
console.log("Dev mode:", !!process.env.IS_DEV)
Server.start();
console.log("Server started successfully.")