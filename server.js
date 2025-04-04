const express = require("express");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Port that the server will listen on, can be set dynamically using environment variable or default to 5000
const port = process.env.PORT || 5001; // Change to 5001 or any other port if needed

io.on("connection", function(socket){
    // Handle new user joining the conversation
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });

    // Handle user exiting the conversation
    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });

    // Handle chat message event
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    });
});

// Start the server on the specified port
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
