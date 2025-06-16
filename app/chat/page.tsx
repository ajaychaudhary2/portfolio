// app/chat/page.tsx
"use client";

import Chat from "@/components/bot"; // Assuming Chat is saved in components

const ChatPage = () => {
  return (
    <main className="bg-black min-h-screen text-white">
      <Chat />
    </main>
  );
};

export default ChatPage;
