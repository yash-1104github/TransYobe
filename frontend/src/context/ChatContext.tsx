import React, { createContext, useContext, useState, useEffect } from "react";

//@ts-ignore
const ChatContext = createContext();

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

// Custom hook for easy access
export const useChat = () => useContext(ChatContext);