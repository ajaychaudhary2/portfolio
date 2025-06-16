"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { marked } from "marked";
import Image from "next/image";
import { MdSend } from "react-icons/md";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

const API_KEYS: string[] = [
  "AIzaSyAzEZWANbnIJ4lmsJju5yjyGr5hCtN1m4c",
];

const emojiMap: Record<string, string> = {
  hello: "👋",
  chat: "💬",
  smart: "🧠",
  idea: "💡",
  thanks: "🙏",
  bye: "👋",
  love: "❤️",
  error: "❌",
  done: "✅",
};

const enhanceEmoji = (text: string): string => {
  const parts = text.split(/(```[\s\S]*?```|[^`]*)/g);
  return parts
    .map((part) =>
      /^```/.test(part)
        ? part
        : part.replace(/\b(\w+)\b/g, (word) =>
            emojiMap[word.toLowerCase()] ? `${word} ${emojiMap[word.toLowerCase()]}` : word
          )
    )
    .join("");
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingBubble, setShowTypingBubble] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hljs.highlightAll();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    const enhanceCodeBlocks = () => {
      const blocks = document.querySelectorAll("pre");
      blocks.forEach((pre) => {
        if (pre.querySelector("button.copy-btn")) return;
        const code = pre.querySelector("code");
        if (!code) return;

        const button = document.createElement("button");
        button.innerText = "Copy";
        button.className =
          "copy-btn absolute top-2 right-2 z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700";
        button.onclick = () => {
          navigator.clipboard.writeText(code.textContent || "");
          button.innerText = "Copied!";
          setTimeout(() => (button.innerText = "Copy"), 1000);
        };

        pre.style.position = "relative";
        pre.appendChild(button);
      });
    };

    enhanceCodeBlocks();
    const observer = new MutationObserver(enhanceCodeBlocks);
    const chatList = document.querySelector(".chat-list");
    if (chatList) observer.observe(chatList, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [messages]);

  const typeOutReply = async (rawText: string) => {
    const enhanced = enhanceEmoji(rawText);
    let html = "";

    if (typeof window !== "undefined" && typeof document !== "undefined") {
      html = DOMPurify.sanitize(await marked(enhanced));
    }

    let displayed = "";
    for (let i = 0; i < html.length; i++) {
      if (cancelled) break;
      displayed += html[i];
      setMessages((prev) => [...prev.slice(0, -1), { role: "model", content: displayed }]);
      await new Promise((res) => setTimeout(res, 8));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setShowTypingBubble(true);

    let reply = "❌ No response.";
    let success = false;

    for (const key of API_KEYS) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                ...messages.map((m) => ({
                  role: m.role,
                  parts: [{ text: m.content }],
                })),
                { role: "user", parts: [{ text: input }] },
              ],
            }),
          }
        );
        const data = await res.json();
        reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || reply;
        success = true;
        break;
      } catch (error) {
        console.error("API key failed:", key, error);
      }
    }

    setShowTypingBubble(false);

    if (!cancelled) {
      setMessages((prev) => [...prev, { role: "model", content: "" }]);
      await typeOutReply(reply);
    }

    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center pt-10 px-4">
      <div className="chat-list space-y-4 overflow-y-auto mt-4 max-h-[70vh] w-full max-w-3xl pb-32">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "items-start space-x-3"} my-2`}
          >
            {msg.role !== "user" && (
              <Image src="/gemini.png" alt="avatar" width={40} height={56} className="object-contain" />
            )}
            <div
              className="max-w-[90%] whitespace-pre-wrap text-[1rem] px-6 py-3 rounded-2xl prose prose-invert break-words overflow-x-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}

        {showTypingBubble && (
          <div className="flex items-start space-x-3">
            <Image src="/gemini.png" alt="avatar" width={40} height={56} className="object-contain" />
            <div className="flex gap-1 mt-3">
              <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse" />
              <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse delay-200" />
              <div className="bg-gray-300 w-2 h-2 rounded-full animate-pulse delay-400" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-4 w-full max-w-2xl bg-[#101625] border border-[#1f2937] px-6 py-4 rounded-2xl flex items-center justify-between shadow-xl space-x-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Copilot"
          className="flex-grow bg-transparent placeholder-gray-400 text-base focus:outline-none"
        />
        <button
          type="submit"
          disabled={isTyping}
          className={`w-9 h-9 flex items-center justify-center ${isTyping ? "bg-[#2f3542] rounded-full" : ""}`}
        >
          {isTyping ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <MdSend className="text-xl hover:text-gray-300" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
