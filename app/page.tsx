"use client"

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  PieChart, 
  BarChart3, 
  MessageSquare, 
  Github, 
  ExternalLink, 
  Target, 
  Shield, 
  Users, 
  Activity, 
  Moon,
  Sun,
  Code,
  Zap,
  Lock
} from 'lucide-react';
import '../styles/welcome-page.css';

export default function BullsEyeWelcome() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
  };

  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: "Stock Analysis",
      description: "Real-time market data analysis with AI-powered insights and predictive analytics",
      accent: "green"
    },
    {
      icon: <PieChart size={24} />,
      title: "Portfolio Management", 
      description: "Intelligent portfolio tracking with risk assessment and optimization suggestions",
      accent: "purple"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Market Intelligence",
      description: "Advanced market trends analysis with sector insights and trading opportunities",
      accent: "orange"
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Conversational Trading",
      description: "Execute trades and get market insights through natural language interactions",
      accent: "yellow"
    }
  ];

  const stats = [
    {
      icon: <Shield size={32} />,
      value: "100%",
      label: "Open Source",
      description: "Fully transparent and community-driven development",
      accent: "green"
    },
    {
      icon: <Activity size={32} />,
      value: "Real-time",
      label: "Market Data",
      description: "Live market feeds with millisecond precision",
      accent: "purple"
    },
    {
      icon: <Code size={32} />,
      value: "MCP",
      label: "Integration",
      description: "Built on Zerodha's Model Context Protocol",
      accent: "orange"
    }
  ];

  const capabilities = [
    {
      icon: <Zap size={20} />,
      title: "Lightning Fast",
      description: "Sub-second response times for critical trading decisions"
    },
    {
      icon: <Lock size={20} />,
      title: "Bank-level Security",
      description: "Enterprise-grade encryption and security protocols"
    },
    {
      icon: <Target size={20} />,
      title: "Precision Trading",
      description: "AI-driven accuracy for optimal trade execution"
    }
  ];

  return (
    <div className="app">
      {/* Navigation Header */}
      <header className="header">
        <div className="container">
          <div className="nav-content">
            <div className="nav-left">
              <div className="logo">BullsEye</div>
              <nav className="nav-links">
                <a href="#features">Features</a>
                <a href="#demo">Demo</a>
                <a href="#docs">Documentation</a>
              </nav>
            </div>
            <div className="nav-right">
              <button onClick={toggleTheme} className="theme-toggle" style={{ background: 'transparent', border: 'none' }}>
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <a href="https://github.com" className="github-link">
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a href="/chat" className="btn-primary">
                <MessageSquare size={16} />
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">BullsEye</h1>
            <p className="hero-description">
              AI-powered financial intelligence built on <span className="highlight-orange">Zerodha MCP</span>. 
              Analyze markets, manage portfolios, and execute trades through intelligent conversation.
            </p>
            
            <div className="hero-buttons">
              <a href="/chat" className="btn-primary">
                <MessageSquare size={16} />
                <span>Start Trading</span>
                <ArrowRight size={16} />
              </a>
              <button className="btn-secondary">
                <ExternalLink size={16} />
                <span>View Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Strip */}
      <section className="capabilities">
        <div className="container">
          <div className="capabilities-grid">
            {capabilities.map((capability, index) => (
              <div key={index} className="capability-item">
                <div className="capability-icon" style={{ background: 'transparent' }}>
                  {capability.icon}
                </div>
                <div className="capability-content">
                  <div className="capability-title">
                    {capability.title}
                  </div>
                  <div className="capability-description">
                    {capability.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Core Features</h2>
            <p className="section-description">
              Everything you need for intelligent trading decisions
            </p>
          </div>
          
          <div className="features-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ flex: '1 1 250px', maxWidth: '280px' }}>
                <div className="feature-icon" style={{ background: 'transparent' }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Demo Section */}
      <section id="demo" className="demo">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">Natural Language Trading</h3>
            <p className="section-description">
              Experience how BullsEye transforms complex trading into simple conversations
            </p>
          </div>
          
          <div className="chat-demo">
            <div className="chat-messages">
              {/* User Message */}
              <div className="message user-message">
                <div className="message-avatar user-avatar">
                  <Users size={16} />
                </div>
                <div className="message-content">
                  <div className="message-sender">You</div>
                  <div className="message-text">
                    "What's the current trend for RELIANCE? Should I buy more?"
                  </div>
                </div>
              </div>
              
              {/* AI Response */}
              <div className="message ai-message">
                <div className="message-avatar ai-avatar">
                  <Target size={16} />
                </div>
                <div className="message-content">
                  <div className="message-sender">BullsEye AI</div>
                  <div className="message-text">
                    <span className="highlight-green">RELIANCE</span> is showing strong upward momentum 
                    (<span className="highlight-green">+2.3%</span> today). Technical analysis suggests continued growth. 
                    Current price: <span className="highlight-yellow">₹2,847</span>. 
                    Shall I execute a buy order for you?
                  </div>
                </div>
              </div>
              
              {/* User Confirmation */}
              <div className="message user-message">
                <div className="message-avatar user-avatar">
                  <Users size={16} />
                </div>
                <div className="message-content">
                  <div className="message-sender">You</div>
                  <div className="message-text">
                    "Yes, buy 10 shares"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ background: 'transparent' }}>
                  {stat.icon}
                </div>
                <div className="stat-value">
                  {stat.value}
                </div>
                <div className="stat-label">
                  {stat.label}
                </div>
                <div className="stat-description">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Start Trading with AI?
            </h2>
            <p className="cta-description">
              Join the future of conversational trading with intelligent market analysis and seamless execution
            </p>
            <div className="cta-buttons">
              <a href="/chat" className="btn-primary">
                <MessageSquare size={16} />
                <span>Start Trading Now</span>
              </a>
              <a href="https://github.com" className="btn-secondary">
                <Github size={16} />
                <span>View Source</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-copyright">
              © 2025 <span className="brand-name">BullsEye</span>. Open source financial intelligence platform.
            </div>
            <div className="footer-links">
              <a href="#">GitHub</a>
              <a href="#">Documentation</a>
              <a href="#">API</a>
              <a href="#">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}