import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "startuphub-ai-realtime" });
});

io.on("connection", (socket) => {
  socket.on("join", (channel: string) => {
    socket.join(channel);
  });

  socket.on("message", (message) => {
    io.to(message.channel ?? "general").emit("message", {
      ...message,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    });
  });

  socket.on("typing", (payload) => {
    socket.to(payload.channel ?? "general").emit("typing", payload);
  });
});

const port = Number(process.env.SOCKET_PORT ?? 4000);
server.listen(port, () => {
  console.log(`StartupHub AI realtime server listening on ${port}`);
});
