const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

module.exports = {
  /**
   * Runs before the Strapi application initializes.
   */
  register(/*{ strapi }*/) {},

  /**
   * Runs before the Strapi application starts.
   */
  bootstrap({ strapi }) {
    const io = new Server(strapi.server.httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("New Socket.IO connection established");

      const token = socket.handshake.query.token;
      console.log("THE TOKEN IS ", token);

      if (!token) {
        console.log("No token provided, disconnecting socket");
        socket.disconnect();
        return;
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
      } catch (err) {
        console.log("Invalid token, disconnecting socket");
        socket.disconnect();
        return;
      }

      // Additional log to confirm the connection is kept open
      console.log("Socket.IO connection successfully authenticated");

      socket.on("joinRoom", (room) => {
        console.log("Joining room:", room);
        socket.join(room);
      });
  
      socket.on("sendMessage", async(textmessage) => {
        const { recievedText, sender,sessionId } = textmessage;
        console.log(recievedText,sender,sessionId);
        io.to(sessionId).emit("newMessage", { recievedText, sender ,sessionId});
          
          const message = {
            sender: JSON.parse(sender).id,
            Text: recievedText,
            session: sessionId,
          };
          //creating a message for strapi
          await strapi.services.message.create(message);
      });

      socket.on("disconnect", () => {
        console.log(`User ${decoded.id} disconnected`);
      });

      socket.on("error", (error) => {
        console.error(`Socket.IO error: ${error}`);
      });
    });
  },
};