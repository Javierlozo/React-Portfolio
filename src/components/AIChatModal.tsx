"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FiZap } from "react-icons/fi";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What's Luis's strongest technical skill?",
  "Tell me about his cybersecurity experience",
  "What projects has he shipped?",
  "What are his honest skill gaps?",
  "Why should we hire Luis over other candidates?",
  "What's his experience with cloud and DevOps?",
  "How does he approach learning new technologies?",
  "What kind of teams and roles is he looking for?",
];

export default function AIChatModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open and handle mobile keyboard
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // On mobile, scroll input into view when keyboard opens
    const handleResize = () => {
      if (window.visualViewport) {
        const modal = document.getElementById("ai-chat-modal");
        if (modal) {
          modal.style.height = `${window.visualViewport.height}px`;
        }
      }
    };

    window.visualViewport?.addEventListener("resize", handleResize);
    return () => {
      document.body.style.overflow = "";
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage: Message = { role: "user", content: text.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!res.ok) throw new Error("Failed to get response");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: assistantContent,
                    };
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 backdrop-blur-sm ${isDark ? "bg-black/60" : "bg-black/40"}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        id="ai-chat-modal"
        className={`relative w-full h-[100dvh] sm:h-[600px] sm:max-w-lg sm:rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
          isDark
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-4 py-3 border-b ${
            isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white/95"
          }`}
        >
          <div className="flex items-center gap-2">
            <FiZap className={`w-5 h-5 ${isDark ? "text-cyan-400" : "text-blue-600"}`} />
            <h2
              className={`text-sm font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Ask AI About Luis
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-900"
            }`}
          >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <p
                className={`text-sm text-center ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Ask me anything about Luis&apos;s experience, skills, or projects.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className={`text-left text-sm px-3 py-2.5 rounded-lg border transition-colors cursor-pointer ${
                      isDark
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? isDark
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-blue-500 text-white rounded-br-md"
                    : isDark
                      ? "bg-gray-800 text-gray-200 rounded-bl-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === "assistant" &&
                  msg.content === "" &&
                  isStreaming && (
                    <span className="inline-flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-500"}`} style={{ animationDelay: "0ms" }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-500"}`} style={{ animationDelay: "150ms" }} />
                      <span className={`w-1.5 h-1.5 rounded-full animate-bounce ${isDark ? "bg-gray-400" : "bg-gray-500"}`} style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className={`px-4 py-3 border-t ${
            isDark ? "border-gray-700 bg-gray-900/95" : "border-gray-200 bg-white/95"
          }`}
        >
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Luis's experience..."
              rows={1}
              className={`flex-1 border rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-cyan-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-blue-500"
              }`}
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className={`p-2.5 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isDark
                  ? "bg-cyan-600 hover:bg-cyan-700"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
            </button>
          </div>
          <p
            className={`text-[10px] mt-1.5 text-center ${
              isDark ? "text-gray-600" : "text-gray-400"
            }`}
          >
            Powered by AI. Responses based on Luis&apos;s actual experience.
          </p>
        </form>
      </div>
    </div>
  );
}
