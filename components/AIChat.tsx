import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

// Initialize GenAI outside component to avoid re-initialization if key is static, 
// but here we assume env var usage as per instructions.
const API_KEY = process.env.API_KEY;

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // For expanding the chat section? Or always visible? Let's make it a section.
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi! I'm Rayhan's AI assistant. Ask me anything about his projects, skills, or experience!",
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error("API Key not configured");
      }

      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      // Use Gemini 2.5 Flash for speed
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: input }]
          }
        ],
        config: {
          systemInstruction: `You are an AI assistant for Rayhan Alviandi's portfolio website. 
          Rayhan is a Senior Frontend Engineer specializing in React, TypeScript, and Creative Development.
          Key traits: Innovative, Detail-oriented, efficient.
          Skills: React, Tailwind, Framer Motion, Gemini API, Node.js.
          Tone: Professional yet friendly, concise, and enthusiastic about tech.
          If asked about contact, suggest emailing contact@rayhan.dev.
          Only answer questions related to Rayhan's professional background.`
        }
      });

      const aiMessage: ChatMessage = {
        role: 'model',
        text: response.text || "I couldn't generate a response at the moment.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: "I'm having trouble connecting to the AI brain right now. Please try again later, or contact Rayhan directly!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="chat" className="py-20 container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <motion.div 
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4 shadow-lg shadow-primary/25"
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Talk to AI Rayhan</h2>
          <p className="text-slate-400">Powered by Google Gemini 2.5 Flash</p>
        </div>

        <div className="bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[500px] bg-slate-950/50 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-slate-700' : 'bg-gradient-to-br from-primary to-secondary'
                }`}>
                  {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                
                <div className={`p-4 rounded-2xl max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-slate-200 rounded-tr-none' 
                    : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed text-sm md:text-base">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 className="flex items-start gap-4"
               >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Bot size={18} />
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-75" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150" />
                  </div>
               </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-4 relative"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my tech stack, experience, or favorite coffee..."
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-white text-background font-bold px-6 rounded-xl hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;