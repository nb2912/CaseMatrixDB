"use client";
import React, { useState } from 'react';

type ChatMessage = { from: 'user' | 'bot'; text: string };

export default function ChatbotPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    // Placeholder: echo response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'This is a placeholder response.' }]);
    }, 500);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Legal Chatbot</h1>
      <div className="border rounded p-4 h-64 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.from === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.from === 'user' ? 'text-blue-600' : 'text-green-700'}>
              {msg.from === 'user' ? 'You: ' : 'Bot: '}
            </span>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a legal question..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
