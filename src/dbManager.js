const mongoose = require("mongoose");
const config = require("./config");
let connection;


let connect = () => {
    mongoose.connect(config.Mongo.mongoUrl, {
        useNewUrlParser: true
    });

    connection = mongoose.connection;

    connection.on("error", function (err) {
        // If first connect fails because mongod is down, try again later.
        // This is only needed for first connect, not for runtime reconnects.
        // See: https://github.com/Automattic/mongoose/issues/5169
        if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
            console.log(new Date(), String(err));

            // Wait for a bit, then try to connect again
            setTimeout(function () {
                console.log("Retrying first connect...");
                connection.openUri(config.Mongo.mongoUrl).catch(() => {});
                // Why the empty catch?
                // Well, errors thrown by db.open() will also be passed to .on('error'),
                // so we can handle them there, no need to log anything in the catch here.
                // But we still need this empty catch to avoid unhandled rejections.
            }, 3 * 1000);
        } else {
            // Some other error occurred.  Log it.
            console.error(new Date(), String(err));
        }
    });

    connection.on("open", function () {
        console.log("MongoDB connected");
    });
};

let disconnect = () => {
    connection.close(() => {
        console.log("MongoDB disconnected");
    });
};

module.exports = {
    connect,
    disconnect,
    mongoose
};