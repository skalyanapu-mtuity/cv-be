const util = require("util");
const request = require("request");
const configHandler = require('./../config/config');
const logging = require('./../common/logging/index');

module.exports = (io) => {
    let timeout = 0;
    /**
     * Tweet streams handler
     * @param {} socket 
     * @param {*} token 
     */
    const tweetStreams = (socket, token) => {
        const config = {
            url: new URL(configHandler.streamURL),
            auth: {
                bearer: configHandler.socketToken,
            },
            timeout: configHandler.timeout,
        };
        try {
            const stream = request.get(config);
            stream
                .on("data", (data) => {
                    try {
                        const json = JSON.parse(data);
                        if (json.connection_issue) {
                            socket.emit("error", json);
                            reTrySocketConnection(stream, socket, token);
                        } else {
                            json && json.data ? socket.emit("tweet", json) : socket.emit("authError", json);
                        }
                    } catch (e) {
                        socket.emit("heartbeat");
                    }
                })
                .on("error", (error) => {
                    logging.error('*** Socket Error ***');
                    socket.emit("error", configHandler.socketErrorMessage);
                    reTrySocketConnection(stream, socket, token);
                });
        } catch (e) {
            socket.emit("authError", configHandler.authMessage);
        }
    };
    /**
     * Fallback handler to mange the  disconnections
     * @param {} stream 
     * @param {*} socket 
     * @param {*} token 
     */
    const reTrySocketConnection = async (stream, socket, token) => {
        timeout++;
        stream.abort();
        await delay(5000);
        tweetStreams(socket, token);
    };
    /**
     * Helper to delay the retry connection request
     */
    const delay = async (d) => {
        return new Promise((resolve) => setTimeout(() => resolve(true), d));
    };
    /**
     * Socket connection event
     */
    io.on("connection", async (socket) => {
        try {
            const token = configHandler.socketToken;
            io.emit("connect", "Client connected");
            const stream = tweetStreams(io, token);
        } catch (e) {
            io.emit("authError", configHandler.authMessage);
        }
    });
};