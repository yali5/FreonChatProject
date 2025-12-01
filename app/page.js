'use client';
import { useState } from "react";
import Image from "next/image";
import Head from 'next/head';
import { useSpeechRecognition } from './api/Listen';
import Footer from '@/components/Footer/footer';

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [ messageInput, setMessageInput ] = useState('');
  const [messages, setMessages] = useState([
  {
    role: 'assistant',
    content: 'How can I help you learn more about Freon Chat?'
  },
  ]);
  // Correctly destructure isListening, startListening, and stopListening
  const { isListening, startListening, stopListening } = useSpeechRecognition(setMessageInput);

  const submitForm = async (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});

    let newMessages = [...messages, { role: 'user', content: messageInput, timestamp: time }
    ];
    setMessages(newMessages);
    setMessageInput('');

    const apiMessage = await fetch(
      '/api',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      }
    ).then(res => res.json());

    const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages([...newMessages,
      { role: 'system', content: apiMessage.message, timestamp: aiTime }]);
    };

  const handleStartListening = () => {
    if (isListening) {
      stopListening(); // Stop recognition if already listening
    } else {
      startListening(); // Start recognition
    }
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  }


  return (
    <>
  <Head>
      {/* Page Metadata */}
      <title>Yassaha Ali | IT Professional & Developer</title>
      <meta name="description" content="IT Professional skilled in Infrastructure, operations, and web development. Explore my work and charity initiatives here." />
      <meta name="keywords" content="IT, Developer, Project Management, Web Development, JavaScript, React, Infrastructure" />
      <meta name="author" content="Yassaha Ali" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:title" content="Yassaha Ali | IT Professional & Developer" />
      <meta property="og:description" content="IT Professional skilled in Infrastructure, operations, and web development." />
      <meta property="og:image" content="/imgs/yassahalogo.png" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Yassaha Ali | IT Professional & Developer" />
      <meta name="twitter:description" content="IT Professional skilled in Infrastructure, operations, and web development." />
      <meta name="twitter:image" content="/imgs/yassahalogo.png" />
    </Head>
    <header>
    </header>
    <main>
      <section id="chatbot" className="chatbot container">
        <h2 className="chatbot-title">
          <img
            className="logo-small"
            src="/imgs/FreonChat.png"
            alt="logo small size"
          />
        </h2>
        <div className="chatbot-blue">
          <div className="chat-info">
            <h3>About</h3>
            <p>
              Chatbot implemented with FreonChat extended version of the report as basis for information source.
            </p>
              <ul>
                <li>Tables, graphics and images have not been implemented and are thus prone to defect.</li>
                <li>Paraphrasing has not been implemented within character count</li>
                <li>Key terms nor company tone implemented</li>
              </ul>
          </div>

          <div className="chat-box">
            <div className="scroll-area">
              <ul id="chat-log">
                {messages.map((message, index) => (
                  <li key={index} className={`${message.role}`}>
                    <span className={`avatar ${message.role}`}>
                      <img
                        src={message.role === 'user' ? '/imgs/user-avatar.png' : '/imgs/ai-avatar.png'} 
                        alt={message.role}
                      />
                    </span>
                      <div className="message">
                          <div dangerouslySetInnerHTML={{ __html: message.content }} />
                          {message.timestamp && (
                            <div className="timestamp">{message.timestamp}</div>
                          )}
                        </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* FIXED FORM STRUCTURE */}
            <form onSubmit={submitForm} className="chat-message">
              <input
                type="text"
                placeholder="Ask any questions here."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <div className="button-container chatbot">
                <button
                  type="button"
                  onClick={handleStartListening}
                  className="button black desktop-only"
                >
                  {isListening ? "recording" : "Speak"}
                </button>
                <button type="submit" className="button send">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
  }