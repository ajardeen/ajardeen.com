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
  PromptInputFooter,
  PromptInputTextarea,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorTrigger,
} from "../ai-elements/model-selector";
import { Button } from "./button";
import type { AiStatus } from "@/types/ai-status";

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

type AiChatProps = {
  onStatusChange: (status: AiStatus) => void;
};
/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function AiChat({ onStatusChange }: AiChatProps) {
  const [isCheckingAI, setIsCheckingAI] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showIntroShimmer, setShowIntroShimmer] = useState(true);
  const [quickQuestions, setQuickQuestions] = useState<string[]>([]);
  const [serverOnline, setServerOnline] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aiDisabled, setAiDisabled] = useState(false);

  /* 🔹 Model state */
  const [selectedModel, setSelectedModel] = useState("gemma-3-1b-it");
  const [modelDisabled, setModelDisabled] = useState<Record<string, boolean>>(
    {},
  );
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);

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

    "What problems has Mohamed solved using React or React Native?",
    "How does Mohamed structure scalable frontend architecture?",
    "What performance optimizations has Mohamed implemented?",
    "How does Mohamed handle API integration and error states?",
    "What UI/UX practices does Mohamed follow in real projects?",
    "Has Mohamed worked with complex forms or dynamic data tables?",
    "How experienced is Mohamed with state management patterns?",
    "What challenges did Mohamed face in production projects?",
    "How does Mohamed debug difficult frontend issues?",
    "What makes Mohamed’s coding style maintainable?",
    "Can you explain Mohamed’s approach to responsive design?",
    "What tools does Mohamed use for testing or code quality?",
    "How comfortable is Mohamed working with backend APIs?",
    "What kind of team environments does Mohamed work best in?",
    "What are Mohamed’s next growth areas as a developer?",
  ];

  const getRandomQuestions = () =>
    [...QUICK_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 2);

  /* -------------------------------------------------- */
  /* Health check */
  /* -------------------------------------------------- */

  useEffect(() => {
    setIsCheckingAI(true);

    onStatusChange({
      state: "loading",
      text: "checking",
      variant: "secondary",
    });

    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/health`);
        const data = await res.json();

        if (!data.aiAvailable) {
          setAiDisabled(true);
          setErrorMessage("⚠️ Daily AI limit reached");

          onStatusChange({
            state: "limited",
            text: "limit reached",
            variant: "pending",
          });

          return;
        }

        onStatusChange({
          state: "online",
          text: "online",
          variant: "success",
        });
      } catch {
        setAiDisabled(true);
        setServerOnline(false);
        setErrorMessage("⚠️ AI service is offline.");

        onStatusChange({
          state: "offline",
          text: "offline",
          variant: "error",
        });
      } finally {
        setIsCheckingAI(false); // ⭐ unlock UI
      }
    })();
  }, []);

  /* -------------------------------------------------- */
  /* Initial greeting */
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

    const timer = setTimeout(() => setShowIntroShimmer(false), INTRO_MIN_DELAY);
    return () => clearTimeout(timer);
  }, []);

  /* -------------------------------------------------- */
  /* Send message */
  /* -------------------------------------------------- */

  const sendMessage = async (text: string) => {
    if (!serverOnline || aiDisabled) return;

    setErrorMessage(null);
    setQuickQuestions(getRandomQuestions());

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

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: text }],
          model: selectedModel,
        }),
      });

      if (!res.ok) {
        const data = await res.json();

        if (res.status === 429) {
          setAiDisabled(true);
          setModelDisabled((p) => ({ ...p, [selectedModel]: true }));
          setErrorMessage(
            data.recommendedModel
              ? `⚠️ Model limit reached. Switch to ${data.recommendedModel}.`
              : data.error,
          );
          onStatusChange({
            state: "limited",
            text: "limit reached",
            variant: "pending",
          });
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }

        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        return;
      }

      if (!res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let received = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        received = true;
        const chunk = decoder.decode(value);

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m,
          ),
        );
      }

      if (!received) {
        setAiDisabled(true);
        setModelDisabled((p) => ({ ...p, [selectedModel]: true }));
        setErrorMessage(
          "⚠️ This model returned no output. Try switching to Gemma 3 (recommended).",
        );
      }
    } catch {
      setServerOnline(false);
      setErrorMessage("⚠️ Unable to reach AI service.");
      onStatusChange({
        state: "offline",
        text: "offline",
        variant: "error",
      });
    } finally {
      setIsTyping(false);
    }
  };

  /* -------------------------------------------------- */
  /* Submit handler */
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
      {isCheckingAI && (
        <div className="flex items-center justify-center text-sm text-muted-foreground py-3">
          <Shimmer>Checking AI service… please wait</Shimmer>
        </div>
      )}
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
                  "group-[.is-assistant]:bg-transparent",
                )}
              >
                {msg.isIntro && showIntroShimmer && !isCheckingAI ? (
                  <Shimmer>{msg.content}</Shimmer>
                ) : (
                  <MessageResponse>{msg.content}</MessageResponse>
                )}
              </MessageContent>
            </Message>
          ))}

          {isTyping && (
            <Message from="assistant">
              <MessageContent className="italic text-muted-foreground">
                <Shimmer>Dexes is typing…</Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      {!isTyping && !aiDisabled && !isCheckingAI && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="rounded-full border px-3 py-1 text-xs hover:bg-accent"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="p-4 space-y-1">
        {errorMessage && (
          <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errorMessage}
          </div>
        )}

        <PromptInput onSubmit={handleSubmit} className="">
          <PromptInputTextarea
            className="min-h-8"
            placeholder={
              aiDisabled
                ? "AI assistant is unavailable"
                : "Ask anything (max 200 characters)"
            }
            rows={1}
            maxLength={MAX_CHARS}
            disabled={isTyping || aiDisabled || !serverOnline || isCheckingAI}
            onChange={(e) => setCharCount(e.target.value.length)}
          />

          <PromptInputFooter>
            <PromptInputTools>
              <ModelSelector
                open={modelSelectorOpen}
                onOpenChange={setModelSelectorOpen}
              >
                <ModelSelectorTrigger className="text-xs">
                  <Button
                    variant={"secondary"}
                    disabled={isCheckingAI || aiDisabled || !serverOnline}
                  >
                    Model: {selectedModel}
                  </Button>
                </ModelSelectorTrigger>

                <ModelSelectorContent>
                  <ModelSelectorInput placeholder="Search models..." />
                  <ModelSelectorList>
                    <ModelSelectorGroup heading="Google Models">
                      {[
                        "gemma-3-1b-it",
                        "gemma-3-12b-it",
                        "gemini-2.5-flash",
                        "gemini-2.5-flash-lite",
                      ].map((model) => (
                        <ModelSelectorItem
                          key={model}
                          disabled={modelDisabled[model]}
                          onSelect={() => {
                            setSelectedModel(model);
                            setAiDisabled(false);
                            setErrorMessage(null);
                            setModelSelectorOpen(false); // ✅ CLOSES DIALOG
                          }}
                        >
                          <ModelSelectorLogo provider="google" />
                          <span className="ml-2">{model}</span>
                          {model === "gemini-2.5-flash" && (
                            <span className="ml-auto text-xs text-green-500">
                              Recommended
                            </span>
                          )}
                        </ModelSelectorItem>
                      ))}
                    </ModelSelectorGroup>
                  </ModelSelectorList>
                </ModelSelectorContent>
              </ModelSelector>
            </PromptInputTools>
          </PromptInputFooter>
        </PromptInput>

        <div className="text-xs text-muted-foreground text-right">
          {charCount} / {MAX_CHARS}
        </div>
      </div>
    </div>
  );
}
