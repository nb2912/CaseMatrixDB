"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserEntity } from '@/types/entities';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const SUGGESTIONS = [
  "How do I file a property dispute?",
  "What is the first step in a criminal case?",
  "How can I track my case status?",
  "What evidence is required for civil litigation?"
];

export default function ChatbotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lawyers, setLawyers] = useState<UserEntity[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch lawyers for matching
  useEffect(() => {
    async function fetchLawyers() {
      try {
        const res = await fetch('/api/lawyers');
        if (res.ok) setLawyers(await res.json());
      } catch (err: unknown) { console.error(err); }
    }
    fetchLawyers();
  }, []);

  // Fetch chat history
  useEffect(() => {
    async function fetchChatHistory() {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/chat?userId=${user.id}`);
        if (res.ok) {
          const history = await res.json();
          if (history.length > 0) {
            setMessages(history.map((m: { role: 'user' | 'assistant'; content: string; timestamp: string; id: string }) => ({
              ...m,
              timestamp: new Date(m.timestamp)
            })));
          } else {
            // Initial welcome if no history
            setMessages([{
              id: '1',
              role: 'assistant',
              content: `Greetings. I am CaseMatrix AI, your legal procedural assistant. How can I provide clarity on your legal matter today?`,
              timestamp: new Date(),
            }]);
          }
        }
      } catch (err: unknown) { console.error('History fetch error:', err); }
    }
    fetchChatHistory();
  }, [user?.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading || !user?.id) return;

    // 1. Save and update User Message
    try {
      const saveUserRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: 'user', content: text }),
      });
      
      if (saveUserRes.ok) {
        const savedMsg = await saveUserRes.json();
        setMessages(prev => [...prev, { ...savedMsg, timestamp: new Date(savedMsg.timestamp) }]);
      } else {
        // Fallback for UI if API fails
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }]);
      }
    } catch (err: unknown) { console.error(err); }

    setInput('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const lowerText = text.toLowerCase();
      let category = "General Legal Inquiry";
      let response = "";
      let specialization = "";

      // HEURISTIC ENGINE: Multi-Cluster Keyword Mapping
      const wordMap = [
        {
          keywords: ['property', 'land', 'house', 'rent', 'eviction', 'title', 'deed', 'ancestral'],
          name: "Civil Litigation (Property)",
          slug: "civil",
          advice: "Property disputes often require specialized verification of title deeds and encumbrance certificates. I recommend a formal legal notice as your first procedural step."
        },
        {
          keywords: ['criminal', 'theft', 'assault', 'fraud', 'arrest', 'police', 'fir', 'murder', 'bail'],
          name: "Criminal Defense",
          slug: "criminal",
          advice: "Criminal matters are high-priority. Ensure you have a certified copy of any FIR or summons. Prepare a detailed chronological list of events for your defense."
        },
        {
          keywords: ['company', 'contract', 'business', 'partnership', 'breach', 'merger', 'agreement'],
          name: "Corporate Law",
          slug: "corporate",
          advice: "Corporate disputes usually pivot on the specific clauses in your MoUs or Service Agreements. Review the 'Dispute Resolution' section for arbitration clauses."
        },
        {
          keywords: ['divorce', 'family', 'marriage', 'custody', 'alimony', 'maintenance', 'adoption'],
          name: "Family Law",
          slug: "family",
          advice: "Family matters are handled in specialized courts. Documentation of marriage records, income statements, or custodial history will be vital for your case filing."
        },
        {
          keywords: ['employment', 'salary', 'labour', 'termination', 'provident', 'harassment', 'workplace'],
          name: "Employment & Labour Law",
          slug: "employment",
          advice: "Employment issues often start with a complaint to the Labour Commissioner or HR. Save all official emails and termination notices as critical evidence."
        },
        {
          keywords: ['accident', 'injury', 'medical', 'negligence', 'hospital', 'crash', 'compensation'],
          name: "Personal Injury & Torts",
          slug: "injury",
          advice: "In injury cases, medical certificates and police accident reports (FIR/CSR) are mandatory. Claims are typically filed in the Motor Accident Claims Tribunal (MACT)."
        },
        {
          keywords: ['tax', 'income', 'gst', 'audit', 'notice', 'tds', 'investment'],
          name: "Taxation Law",
          slug: "tax",
          advice: "Taxation disputes often involve responding to specific assessment notices. Collate your financial statements and previous filings before proceeding."
        },
        {
          keywords: ['patent', 'trademark', 'copyright', 'piracy', 'logo', 'brand', 'intellectual'],
          name: "Intellectual Property (IP)",
          slug: "ip",
          advice: "IP protection is strictly time-bound. Verify your registration certificates and document any 'prior use' of the brand or invention."
        },
        {
          keywords: ['cyber', 'online', 'hacking', 'data', 'phishing', 'privacy', 'social media'],
          name: "Cyber & Information Tech Law",
          slug: "cyber",
          advice: "Cyber crimes require digital forensics. Do not delete any chat logs or transaction IDs; these are treated as primary electronic evidence."
        },
        {
          keywords: ['consumer', 'product', 'service', 'warranty', 'refund', 'ad', 'misleading'],
          name: "Consumer Protection",
          slug: "consumer",
          advice: "Consumer cases are filed in District Commissions. You will need proof of purchase (invoice) and evidence of the service deficiency or product defect."
        }
      ];

      const match = wordMap.find(cluster => 
        cluster.keywords.some(word => lowerText.includes(word))
      );

      if (match) {
        category = match.name;
        specialization = match.slug;
        response = match.advice;
      } else {
        response = "I have received your overview. To provide a precise categorization and counsel recommendation, could you clarify if this involves property, criminal allegations, or business contracts?";
      }

      let suggestionText = "";
      if (specialization) {
        const suggestedLawyer = lawyers.find(l => l.specialization?.toLowerCase() === specialization);
        if (suggestedLawyer) {
          suggestionText = `\n\n**🔍 Analysis Results:**\n• **Category:** ${category}\n• **Recommended Counsel:** ${suggestedLawyer.email.split('@')[0]} (${suggestedLawyer.specialization} specialist)\n\nYou can reach out to them for formal representation through our 'Appoint Lawyer' terminal.`;
        } else {
          suggestionText = `\n\n**🔍 Analysis Results:**\n• **Category:** ${category}\n• **Status:** No identical specialists currently online. I recommend consulting our general legal panel.`;
        }
      }

      const finalContent = response + suggestionText;

      // 2. Save and update Assistant Message
      const saveBotRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: 'assistant', content: finalContent }),
      });

      if (saveBotRes.ok) {
        const savedBotMsg = await saveBotRes.json();
        setMessages(prev => [...prev, { ...savedBotMsg, timestamp: new Date(savedBotMsg.timestamp) }]);
      } else {
        setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: finalContent, timestamp: new Date() }]);
      }

    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 min-h-0 glass-card border-slate-200 shadow-xl flex flex-col overflow-hidden relative rounded-xl md:rounded-2xl">
        
        {/* Messages Window */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6 md:space-y-8 custom-scrollbar bg-slate-50/30"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`max-w-[95%] md:max-w-[80%] flex gap-2 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl shrink-0 flex items-center justify-center font-bold text-[10px] md:text-xs ring-2 md:ring-4 ring-white shadow-sm ${
                  msg.role === 'user' ? 'bg-accent-600 text-white' : 'bg-primary-900 text-accent-500'
                }`}>
                  {msg.role === 'user' ? (user?.email?.[0].toUpperCase() || 'U') : 'AI'}
                </div>
                <div className={`space-y-1 md:space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                  <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
               <div className="flex gap-2 md:gap-4">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl bg-primary-900 flex items-center justify-center text-accent-500 font-bold text-[10px] md:text-xs shrink-0">AI</div>
                <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-xl md:rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="flex-shrink-0 p-4 md:p-6 bg-white border-t border-slate-100">
          {messages.length < 3 && (
            <div className="flex overflow-x-auto pb-2 mb-2 md:mb-4 gap-2 no-scrollbar scroll-smooth">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap text-[10px] md:text-[11px] font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:border-accent-500 hover:text-accent-600 transition-all shrink-0"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative flex items-center gap-2 md:gap-3"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about legal procedural requirements..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-medium text-slate-700 outline-none focus:bg-white focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500/30 transition-all pr-12 md:pr-16"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 md:right-2 p-2 md:p-3 bg-primary-900 text-accent-500 rounded-lg md:rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              <svg className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
          <p className="hidden md:block text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
            AI Assistant provides procedural information only • Not a substitute for professional legal advice
          </p>
        </div>
      </div>
    </div>
  );
}
