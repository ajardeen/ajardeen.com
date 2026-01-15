"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/messages";
import {
  PromptInput,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { Shimmer } from "@/components/ai-elements/shimmer";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  isIntro?: boolean;
};

const MAX_CHARS = 200;
const INTRO_MIN_DELAY = 500;

/* ------------------------------------------------------------------ */
/* Quick Questions */
/* ------------------------------------------------------------------ */

const QUICK_QUESTIONS = [
  "Can you summarize Mohamed Ajardeen’s profile?",
  "Why should we hire Mohamed Ajardeen?",
  "What are Mohamed’s strongest technical skills?",
  "Which projects best showcase his frontend skills?",
  "Is Mohamed more frontend or full stack focused?",
  "What real-world experience does Mohamed have?",
  "What technologies does Mohamed use most confidently?",
  "Can you explain Mohamed’s Hostel Management System project?",
  "How does Mohamed stand out from other junior developers?",
  "What type of roles is Mohamed best suited for?",
];

const getRandomQuestions = () => {
  const shuffled = [...QUICK_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function AiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showIntroShimmer, setShowIntroShimmer] = useState(true);
  const [quickQuestions, setQuickQuestions] = useState<string[]>([]);

  /* -------------------------------------------------- */
  /* Initial greeting + questions */
  /* -------------------------------------------------- */
  useEffect(() => {
    setMessages([
      {
        id: nanoid(),
        role: "assistant",
        content:
          "Hi, I’m Dexes — an AI assistant working for Ajardeen. How can I help you today?",
        isIntro: true,
      },
    ]);

    setQuickQuestions(getRandomQuestions());

    const timer = setTimeout(
      () => setShowIntroShimmer(false),
      INTRO_MIN_DELAY
    );

    return () => clearTimeout(timer);
  }, []);

  /* -------------------------------------------------- */
  /* Send message (streaming) */
  /* -------------------------------------------------- */
  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content: text,
    };

    const assistantId = nanoid();

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    setIsTyping(true);
    setQuickQuestions(getRandomQuestions());

    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!res.body) {
      setIsTyping(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: msg.content + chunk }
            : msg
        )
      );
    }

    setIsTyping(false);
  };

  /* -------------------------------------------------- */
  /* PromptInput submit */
  /* -------------------------------------------------- */
  const handleSubmit = async (message: PromptInputMessage) => {
    if (!message.text.trim()) return;
    if (message.text.length > MAX_CHARS) return;

    setCharCount(0);
    await sendMessage(message.text);
  };

  /* ------------------------------------------------------------------ */
  /* Render */
  /* ------------------------------------------------------------------ */

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <Conversation>
        <ConversationContent
          className="flex-1 overflow-y-auto"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <Message key={msg.id} from={msg.role}>
              <MessageContent
                className={cn(
                  "group-[.is-user]:rounded-[20px] group-[.is-user]:bg-secondary",
                  "group-[.is-assistant]:bg-transparent"
                )}
              >
                {msg.isIntro && showIntroShimmer ? (
                  <Shimmer duration={2} spread={2}>
                    {msg.content}
                  </Shimmer>
                ) : (
                  <MessageResponse>{msg.content}</MessageResponse>
                )}
              </MessageContent>
            </Message>
          ))}

          {isTyping && (
            <Message from="assistant">
              <MessageContent className="italic text-muted-foreground">
                <Shimmer duration={2} spread={2}>
                  Dexes is typing…
                </Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      {/* Quick Questions */}
      {!isTyping && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="rounded-full border px-3 py-1 text-xs hover:bg-accent transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 space-y-1">
        <PromptInput onSubmit={handleSubmit} className="rounded-4xl!">
          <PromptInputTextarea
            placeholder="Ask anything (max 200 characters)"
            rows={1}
            className="min-h-5"
            maxLength={MAX_CHARS}
            onChange={(e) => setCharCount(e.target.value.length)}
            disabled={isTyping}
          />
        </PromptInput>

        <div className="text-xs text-muted-foreground text-right">
          {charCount} / {MAX_CHARS}
        </div>
      </div>
    </div>
  );
}
