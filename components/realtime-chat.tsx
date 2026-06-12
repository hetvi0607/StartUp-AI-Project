"use client";

import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ChatMessage = { id: string; content: string; sender: string; createdAt: string };

export function RealtimeChat() {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:4000", { autoConnect: false }), []);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.connect();
    socket.emit("join", "general");
    socket.on("message", (message) => setMessages((current) => [...current, message]));
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Card>
      <CardHeader><CardTitle>Real-Time Chat</CardTitle></CardHeader>
      <CardContent>
        <div className="mb-4 h-80 overflow-auto rounded-md border border-border bg-slate-950/70 p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-3 rounded-md bg-white/5 p-3">
              <div className="text-xs text-slate-500">{message.sender}</div>
              <div className="text-sm text-white">{message.content}</div>
            </div>
          ))}
          {!messages.length ? <div className="text-sm text-slate-500">Connect the Socket.io server and send the first team message.</div> : null}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const content = String(form.get("content") ?? "");
            if (!content.trim()) return;
            socket.emit("message", { channel: "general", content, sender: "Founder" });
            event.currentTarget.reset();
          }}
        >
          <Input name="content" placeholder="Share an update..." />
          <Button type="submit" size="icon" aria-label="Send message"><Send className="h-4 w-4" /></Button>
        </form>
      </CardContent>
    </Card>
  );
}
