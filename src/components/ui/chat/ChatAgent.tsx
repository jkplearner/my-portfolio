import React, { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { SYSTEM_PROMPT } from './chatContext';
import './ChatAgent.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const STORAGE_KEY = 'portfolio-chat-history-v2';
const GREETING = 'Hey there! 👋 I\'m Pavan\'s AI assistant. Ask me anything about his skills, projects, or experience — happy to help!';

const CONTACT_FORM_MARKER = '[CONTACT_FORM]';

// EmailJS config (same as ContactSection)
const EMAILJS_SERVICE = 'service_kyqzoh5';
const EMAILJS_TEMPLATE_OWNER = 'template_79obf6o';
const EMAILJS_TEMPLATE_REPLY = 'template_2gb5k3y';
const EMAILJS_PUBLIC_KEY = 'kZWV_LYRYcOoTZ_Ll';

const ChatAgent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch { /* ignore */ }
        return [{ role: 'assistant' as const, content: GREETING }];
    });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactSending, setContactSending] = useState(false);
    const [contactSent, setContactSent] = useState(false);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch { /* quota exceeded — ignore */ }
    }, [messages]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, showContactForm, contactSent]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    // Lock body scroll on mobile when open
    useEffect(() => {
        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isMobile, isOpen]);

    const sendMessage = useCallback(async () => {
        const text = input.trim();
        if (!text || isTyping) return;

        // Dismiss any open contact form when user sends a new message
        setShowContactForm(false);

        const userMsg: Message = { role: 'user', content: text };
        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInput('');
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_AI_API || '';
            const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...updatedMessages.map(m => ({ role: m.role, content: m.content })),
                    ],
                    temperature: 0.7,
                    max_tokens: 512,
                }),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            let reply = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t process that. Please try again.';

            // Check if the AI wants to show the contact form
            if (reply.includes(CONTACT_FORM_MARKER)) {
                reply = reply.replace(CONTACT_FORM_MARKER, '').trim();
                setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
                setShowContactForm(true);
                setContactSent(false);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            }
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again in a moment.' },
            ]);
        } finally {
            setIsTyping(false);
        }
    }, [input, messages, isTyping]);

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

        setContactSending(true);

        try {
            const templateParams = {
                name: contactName.trim(),
                email: contactEmail.trim(),
                message: `[Via AI Chat Agent] ${contactMessage.trim()}`,
            };

            await Promise.all([
                emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_OWNER, templateParams, EMAILJS_PUBLIC_KEY),
                emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE_REPLY, templateParams, EMAILJS_PUBLIC_KEY),
            ]);

            setContactSent(true);
            setShowContactForm(false);
            setContactName('');
            setContactEmail('');
            setContactMessage('');

            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Your message has been sent successfully. Pavan will get back to you soon!' },
            ]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: 'assistant', content: 'Sorry, there was an issue sending your message. You can also reach out directly at jkpm4321@gmail.com.' },
            ]);
            setShowContactForm(false);
        } finally {
            setContactSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <>
            {/* Mobile backdrop */}
            {isMobile && isOpen && (
                <div className="chat-mobile-backdrop" onClick={() => setIsOpen(false)} />
            )}

            {/* Floating trigger button */}
            <button
                className={`chat-trigger ${isOpen ? 'open' : ''}`}
                onClick={toggleOpen}
                aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </button>

            {/* Chat popup */}
            <div className={`chat-popup ${isOpen ? 'visible' : ''}`}>
                {/* Header */}
                <div className="chat-header">
                    <div className="chat-header-title">
                        <div className="chat-header-dot" />
                        <h3>Pavan's Assistant</h3>
                    </div>
                    <button className="chat-header-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="chat-messages">
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-msg ${msg.role}`}>
                            {msg.content}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="typing-indicator">
                            <span /><span /><span />
                        </div>
                    )}

                    {/* Inline contact form */}
                    {showContactForm && !contactSent && (
                        <form className="chat-contact-form" onSubmit={handleContactSubmit}>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Your name"
                                value={contactName}
                                onChange={e => setContactName(e.target.value)}
                                required
                            />
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Your email"
                                value={contactEmail}
                                onChange={e => setContactEmail(e.target.value)}
                                required
                            />
                            <label>Message</label>
                            <textarea
                                placeholder="Your message to Pavan..."
                                value={contactMessage}
                                onChange={e => setContactMessage(e.target.value)}
                                rows={3}
                                required
                            />
                            <button
                                type="submit"
                                className="chat-contact-send"
                                disabled={contactSending || !contactName.trim() || !contactEmail.trim() || !contactMessage.trim()}
                            >
                                {contactSending ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="chat-input-area">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Ask about Pavan..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isTyping}
                    />
                    <button
                        className="chat-send-btn"
                        onClick={sendMessage}
                        disabled={!input.trim() || isTyping}
                        aria-label="Send message"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatAgent;
