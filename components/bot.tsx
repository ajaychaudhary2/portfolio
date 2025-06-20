"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import hljs from "highlight.js";
import { marked } from "marked";
import { GEMINI_API_KEYS } from "@/lib/config";
import Image from "next/image";
import { MdSaveAlt } from "react-icons/md"

import { FaRegEdit } from "react-icons/fa";
import {
  MdSend,
  MdOutlineTranslate,
  MdLightbulbOutline,
  MdTravelExplore,
  MdFitnessCenter,
  MdMovie,
  MdSpaceDashboard,
} from "react-icons/md";
import { PiBrain, PiQuotesBold, PiNewspaperClipping } from "react-icons/pi";
import { FaUtensils, FaMicrochip } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { GiNotebook } from "react-icons/gi";

type ChatMessage = {
  role: "user" | "model";
  content: string;
  isHTML?: boolean;
};

const API_KEYS = GEMINI_API_KEYS;

const stopTypingRef = { current: false };

const suggestions = [
  { text: "Give me travel tips", icon: <MdTravelExplore /> },
  { text: "Explain quantum computing", icon: <FaMicrochip /> },
  { text: "Help write a poem", icon: <GiNotebook /> },
  { text: "Plan a workout routine", icon: <MdFitnessCenter /> },
  { text: "Suggest a movie to watch", icon: <MdMovie /> },
  { text: "Tell me a fun fact", icon: <TbMessageChatbot /> },
  { text: "Summarize this news for me", icon: <PiNewspaperClipping /> },
  { text: "Design a startup idea", icon: <MdLightbulbOutline /> },
  { text: "What should I eat today?", icon: <FaUtensils /> },
  { text: "Give a motivational quote", icon: <PiQuotesBold /> },
  { text: "Teach me about space", icon: <MdSpaceDashboard /> },
  { text: "Translate to Spanish", icon: <MdOutlineTranslate /> },
];

const formatAIResponse = (text: string) => {
  return text
    .replace(/^\s*[*•\-]\s*$/gm, "")
    .replace(/(^|\n)\s*[*•\-](?=\s+)/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\*\*(.*?)\*\*/g, "\n\n**$1**")
    .trim();
};

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typedContent, setTypedContent] = useState("");
  const [showTypingBubble, setShowTypingBubble] = useState(false);
  const [chatListHeight, setChatListHeight] = useState("calc(100vh - 280px)");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    hljs.highlightAll();
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useLayoutEffect(() => {
    const updateHeight = () => {
      if (inputRef.current) {
        const inputHeight = inputRef.current.offsetHeight + 32;
        const remaining = window.innerHeight - inputHeight;
        setChatListHeight(`${remaining}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

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

  const typeText = async (text: string) => {
    setTypedContent("");
    setIsTyping(true);
    setShowTypingBubble(true);
    stopTypingRef.current = false;

    const words = text.split(/(\s+)/);
    let currentText = "";
    let index = 0;

    const typeNextWord = async () => {
      if (index >= words.length || stopTypingRef.current) {
        const raw = await marked.parse(currentText);
        const html = DOMPurify.sanitize(raw);
        setMessages((prev) => [...prev, { role: "model", content: html, isHTML: true }]);
        setTypedContent("");
        setIsTyping(false);
        setShowTypingBubble(false);
        return;
      }

      currentText += words[index++];
      const raw = await marked.parse(currentText);
      const html = DOMPurify.sanitize(raw);
      setTypedContent(html);
      setTimeout(typeNextWord, 50);
    };

    typeNextWord();
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isTyping) return;

  const userMsg: ChatMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMsg]);
  setInput("");
  setIsTyping(true);
  setShowTypingBubble(true);

  let reply = "No response yet. Please refresh and try again.";
  let firstTry = true;
  const shuffledKeys = [...API_KEYS].sort(() => 0.5 - Math.random());

  for (const key of shuffledKeys) {
    try {
      if (!firstTry) {
        setTypedContent("<em>Trying alternate API key...</em>");
      }

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
      const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (candidate) {
        reply = formatAIResponse(candidate);
        break;
      }
    } catch (error) {
      console.error("API failed with key:", key, error);
    }
    firstTry = false;
  }

  await typeText(reply);
};

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#0d0d0d] via-[#0b0b0b] to-black text-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center pt-10 px-4">
        <div className="absolute top-8 left-10 flex items-center gap-3">
  <img src="/ajlogo.jpg" alt="avatar" className="w-14  h-14 rounded-full border border-purple" />
  <div className="text-purple text-xl font-bold tracking-wide">Ajay Chaudhary</div>
</div>
  {/* 🆕 + 💾 Buttons */}
        <div className="absolute top-8 right-10 z-30 flex gap-4">

 

{/* New Chat Button */}
<button
  onClick={() => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setTypedContent("");
    setShowTypingBubble(false);
    stopTypingRef.current = false;
  }}
  className="flex items-center gap-2 justify-center bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] rounded-2xl px-4 py-3 text-sm shadow-lg shadow-[#0d0f1d]/70 cursor-pointer hover:scale-105 transition-transform"
>
  <FaRegEdit className="text-[17px]  text-base" style={{ color: "#c084fc" }} />
  <span className="text-purple-400">New Chat</span>
</button>
          {/* Save Chat Button */}
<button
  onClick={() => {
    const content = messages
      .map((msg) =>
        `${msg.role === "user" ? "🧑‍💬 You" : "🤖 Bot"}: ${
          msg.isHTML
            ? DOMPurify.sanitize(msg.content.replace(/<[^>]+>/g, ""), { ALLOWED_TAGS: [] })
            : msg.content
        }`
      )
      .join("\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:T]/g, "-").split(".")[0];
    link.href = URL.createObjectURL(blob);
    link.download = `chat-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }}
  className="flex items-center gap-2 justify-center bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] rounded-2xl px-4 py-3 text-white text-sm shadow-lg shadow-[#0d0f1d]/70 cursor-pointer hover:scale-105 transition-transform"
>
  <MdSaveAlt className="text-[17px] text-base" style={{ color: "#c084fc" }} />
  <span className="text-white">Save Chat</span>
</button>
        </div>
 

        <div
          className="chat-list space-y-9 overflow-y-auto w-full max-w-3xl pb-6 px-2 scrollbar-hide"
          style={{ maxHeight: chatListHeight }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role !== "user" && (
                <Image src="/ic.png" alt="avatar" width={36} height={36} className="mr-2 w-9 h-9 object-contain" />
              )}
              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl text-purple bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] shadow ${
                  msg.isHTML ? "" : "whitespace-pre-wrap"
                }`}
                {...(msg.isHTML
                  ? { dangerouslySetInnerHTML: { __html: msg.content } }
                  : { children: msg.content })}
              />
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start items-start">
              <Image src="/ic.png" alt="avatar" width={36} height={36} className="mr-2 w-9 h-9 object-contain" />
              <div className="flex items-center gap-1 mt-2 bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] px-5 py-3 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-200" />
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-400" />
              </div>
            </div>
          )}

          {typedContent && (
            <div className="flex justify-start items-start">
              <Image src="/ic.png" alt="avatar" width={36} height={36} className="mr-2 w-9 h-9 object-contain" />
              <div
                className="max-w-[75%] px-5 py-3 rounded-2xl bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] text-purple shadow"
                dangerouslySetInnerHTML={{ __html: typedContent }}
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 0 && (
          <div className="w-full max-w-2xl mt-10 mb-6 z-30">
            <h1 className="text-4xl sm:text-5xl font-semibold text-purple text-center mb-12">
              Hey, what’s on your mind today?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => handleSuggestion(s.text)}
                  className="flex items-center gap-2 justify-center bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] rounded-2xl p-4 text-white text-sm shadow-lg shadow-[#0d0f1d]/70 cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="text-lg text-purple">{s.icon}</span>
                  <span>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form
          ref={inputRef}
          onSubmit={handleSubmit}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-gradient-to-r from-[#11172a] via-[#1b223a] to-[#11172a] border border-[#1f2937] px-6 py-4 rounded-2xl flex items-center justify-between shadow-lg shadow-[#0d0f1d]/70"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Need help? Just ask!"
            className="flex-grow bg-transparent placeholder-gray-400 text-base focus:outline-none text-purple"
          />
          {isTyping ? (
            <button
              type="button"
              onClick={() => {
                stopTypingRef.current = true;
                setIsTyping(false);
                setShowTypingBubble(false);
              }}
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-b from-[#0d0d0d] via-[#0b0b0b] to-black hover:brightness-110"
              title="Stop generating"
            >
              <div className="absolute w-5 h-5 border-2 border-t-transparent border-purple rounded-full animate-spin" />
              <div className="relative z-10 text-purple text-xs font-bold">✖</div>
            </button>
          ) : (
            <button type="submit" className="w-9 h-9 flex items-center justify-center text-purple">
              <MdSend className="text-xl hover:text-gray-300" />
            </button>
          )}
        </form>
      </main>
  <div className="fixed bottom-4 left-8 text-gray-500 text-sm">
  Built with ❤️ by <span className="text-purple">AJAY CHAUDHARY</span>
</div>

    </div>
    
  );
};

export default Chat;
