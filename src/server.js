let app = require("./app");
const config = require("./config");
const dbManager = require("./dbManager");
const port = config.Server.port;

//Starts server
let serverInstance = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

dbManager.connect();

// Shuts server down when app exits
process.on("SIGINT", function () {
    serverInstance.close();
    dbManager.disconnect();
    console.log("Server turned off");
});


// process.on("SIGHUP", function () {
//     console.log("SIGHUP");
// });