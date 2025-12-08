import React, { createContext, useContext, useState, useEffect } from "react";

export interface Message {
  text: string;
  sender: "user" | "bot"; 
  timestamp: number;
}

export interface ChatContextType {
  messages: Record<string, Message[]>; // videoId -> messages
  addMessage: (videoId: string, msg: Message) => void;
  clearMessages: (videoId: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }) => {

  const [messages, setMessages] = useState({}); 

  // Load chats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("chat_messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chats to localStorage when messages change
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (videoId, msg) => {
    setMessages((prev) => ({
      ...prev,
      [videoId]: [...(prev[videoId] || []), msg],
    }));
  };

  const clearMessages = (videoId) => {
    setMessages((prev) => {
      const newMsgs = { ...prev };
      delete newMsgs[videoId];
      return newMsgs;
    });
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);