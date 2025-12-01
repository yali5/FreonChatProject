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
    content: 'How can I help you learn more about Yassaha?'
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
      <a href="#" className="logo-holder">
                <img src="./imgs/yassahalogo.png" alt="Yassaha" />
      </a>
      <nav>
        <ul id="menu" className={menuOpen ? "active" : ""}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#charity">Charity</a>
          </li>
          <li>
            <a href="#chatbot">Chatbot</a>
          </li>
          <li>
            <a href="mailto:yassahaali@gmail.com" className="button">Contact Me</a>
          </li>
        </ul>
        <a href="#" className="mobile-toggle" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10"/>
          </svg>
        </a>
      </nav>
    </header>
    <main>
      <section className="hero container">
        <div className="hero-blue">
          <div>
            <h1><small>Hi I'm</small>
              Yassaha Ali
            </h1>
            <p>
              IT Professional having worked on Infrastructure, operations and coding in HTML, CSS and Javascript. This site contains my work history and charity works. <span> I'm interested in Project Management, web development.</span>
            </p>
            <div className="call-to-action">
              <a href="./C.V_Yassaha_August_2024.pdf" className="button black">
                View Resume
              </a>
              <a href="mailto:yassahaali@gmail.com" className="button white">
                Contact Me
              </a>
            </div>
            <div className="social-links">
              <a href="https://github.com/yali5/">
                <img src="./imgs/github.png" alt="GitHub" width="48" />
              </a>
              <a href="https://www.linkedin.com/in/yassahaali/">
                <img src="./imgs/linkedin.png" alt="LinkedIn" width="48" />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-yellow">
          <img src="./imgs/hero-image.png" alt="Yassaha Ali" width="100%" />
        </div>
      </section>
      <section className="logos container">
        <div className="marquee">
          <div className="track">
            <img src="./imgs/html.png" alt="HTML" width="128" />
            <img src="./imgs/css.png" alt="CSS" width="128" />
            <img src="./imgs/javascript.png" alt="JS" width="128" />
            <img src="./imgs/react.png" width="128" alt="React" />
            <img src="./imgs/vscode.png" width="128" alt="VS Code" />
                      <img src="./imgs/eclipse.png" width="128" alt="eclipse" />
            <img src="./imgs/html.png" alt="HTML" width="128" />
            <img src="./imgs/css.png" alt="CSS" width="128" />
            <img src="./imgs/javascript.png" alt="JS" width="128" />
            <img src="./imgs/react.png" width="128" alt="React" />
            <img src="./imgs/vscode.png" width="128" alt="VS Code" />
                      <img src="./imgs/eclipse.png" width="128" alt="eclipse" />
          </div>
        </div>
      </section>
      <section id="skills" className="skills container">
        <h2>
          <small>About Me</small>
          Skills
        </h2>
        <div className="holder-blue">
          <div className="left-column">
            <h3>Frontend</h3>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
            </ul>
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>Java</li>
              <li>Ruby</li>
            </ul>
          </div>
          <div className="right-column">
            <h3>A bit about me</h3>
            <p>
              With a comprehensive background in project management, software development, and business analysis, along with a proven track record of managing key projects with budgets of up to £2.2 million, I am excited about the opportunity to bring my expertise to your esteemed organization.
            </p>
            <p>
              I have a PRINCE2 certification in project management, am ScrumMaster certified. I have experience in leading both Agile and Waterfall methodologies. My Bachelor of Science degree in Ergonomics from Loughborough University has given me a solid foundation in human factors, user experience, and system design. I am eager to develop myself, learn from those around me, and share knowledge I gain.
            </p>
          </div>
        </div>
      </section>
      <section className="work-experience container">
        <h2>
          <small>Recent</small>
          Work Experience
        </h2>
        <div className="jobs">
          <article>
            <figure>
              <div>
                <img src="./imgs/workplace-5.jpg" alt="Workplace 5 - SSI Schaefer" width="100%" />
                <figcaption>
                  Workplace - SSI Schaefer
                </figcaption>
              </div>
            </figure>
            <h3>IT Logistics Consultant</h3>
            <div>November 2023 - May 2024</div>
            <p>Working on WAMAS application(WMS) in order to provide customisation required by end customer via customer workshops, requests and development.</p>
          </article>
          <article>
            <figure>
              <div>
                <img src="./imgs/workplace-4.jpg" alt="Workplace 4 - AVASO" width="100%" />
                <figcaption>
                  Workplace - AVASO
                </figcaption>
              </div>
            </figure>
            <h3>IT Support Technician</h3>
            <div>December 2022 - November 2023</div>
            <p> Working as a freelance consultant in order to provide Network engineer related tasks such as tracking and deracking tasks along with deskside support escalations. For while I looked for a new role.</p>
          </article>
          <article>
            <figure>
              <div>
                <img src="./imgs/workplace-3.jpg" alt="Workplace 3 - Ford Credit Europe" width="100%" />
                <figcaption>
                  Workplace - Ford Credit Europe
                </figcaption>
              </div>
            </figure>
            <h3>Software Developer</h3>
            <div>August 2021 - November 2022</div>
            <p>Coding a vehicle leasing software application. The role largely comprimised of upolding agile ceremonies, and revolved around SFA authentication and end-point connections</p>
          </article>
        </div>
      </section>
      <section className="work-experience container two">
  <div className="jobs">
  <article>
      <figure>
        <div>
          <img src="./imgs/workplace-2.jpg" alt="Ford Motor Company office" width="100%" />
          <figcaption>
            Workplace - Ford Motor Company
          </figcaption>
        </div>
      </figure>
      <h3>IT Project Manager</h3>
      <time>August 2018 - September 2021</time>
      <p>
        Managed IT projects across Europe, including office relocations, WLAN/LAN refreshes, and new infrastructure builds.
      </p>
    </article>
    <article>
      <figure>
        <div>
          <img src="./imgs/workplace-2.jpg" alt="Ford Motor Company office" width="100%" />
          <figcaption>
            Workplace - Ford Motor Company
          </figcaption>
        </div>
      </figure>
      <h3>IT Site Management BA</h3>
      <time>April 2017 - August 2018</time>
      <p>
        Acted as an active member of the Dunton Site management team, providing IT support, maintaining communications, and overseeing local IT security.
      </p>
    </article>
    <article>
      <figure>
        <div>
          <img src="./imgs/workplace-1.jpg" alt="Three Rivers District Council office" width="100%" />
          <figcaption>
            Workplace - Three Rivers District Council
          </figcaption>
        </div>
      </figure>
      <h3>IT Deployment Technician</h3>
      <time>May 2016</time>
      <p>Supported the deployment of new computers and Windows 7.</p>
    </article>
  </div>
</section>
      <section id="charity" className="charity">
        <h2>
          <small>
            Please help out
          </small>
          Charity
        </h2>
        <div className="charity-blue">
          <div className="charity-info">
            <h3>Brighton Marathon 2026</h3>
            <p>Until the event I'll continue to look after my health and exercise with weight lifting and running. So far I am strong and healthy.</p>
            <br></br>
            <p>You can use the button below in order to access my just giving page</p>
            <br></br>
              <a href="https://www.justgiving.com/page/yassaha-ali-4" className="button black">
                Donate
              </a>
          </div>
        </div>
      </section>
      <section id="chatbot" className="chatbot container">
        <h2>
          <small>Talk to me</small>
          Chatbot
        </h2>
        <div className="chatbot-blue">
          <div className="chat-info">
            <h3>OpenAI Chatbot</h3>
            <p>
              I've put together a chatbot here which knows all my skills, work experience, and has a copy of my CV/Resume. 
              You can use it to ask questions about me to get a better idea of who I am and what I've done.
            </p>
            <p>
              You can also download my resume here if you want to take a look at it. I'm currently looking for new opportunities, so if you have a project you think I'd be a good fit for, please get in touch!
            </p>
            <a href="./C.V_Yassaha_August_2024.pdf" className="button black">Download Resume</a>
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