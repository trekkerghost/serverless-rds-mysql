const mysql = require('mysql');

const configDB = {
    host: 'rds-mysql4.cpzd5p5qxx7p.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'I0sxiOh63GS0CkEwGBGd',
    port: 3306,
    database: 'rds-course-mysql',
    debug: true
};

function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.config);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }
    const connection = mysql.createConnection(config);
    addDisconnectHandler(connection);
    connection.connect();
    return connection;
}

const connection = initializeConnection(configDB);

module.exports = connection;