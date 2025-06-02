import React from 'react';
import { ArrowRight, TrendingUp, PieChart, BarChart3, MessageSquare, Github, ExternalLink, Target, Zap, Shield, Users, Activity, DollarSign } from 'lucide-react';

export default function BullsEyeWelcome() {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Stock Analysis",
      description: "Real-time stock data and comprehensive analysis through conversational AI",
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      hoverShadow: "hover:shadow-emerald-200/50"
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Portfolio Tracking", 
      description: "Track and analyze your investment portfolio with intelligent insights",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      hoverShadow: "hover:shadow-blue-200/50"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Market Insights",
      description: "Get market trends, sector analysis, and trading opportunities",
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      hoverShadow: "hover:shadow-orange-200/50"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Trading",
      description: "Execute trades through natural language conversations",
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      hoverShadow: "hover:shadow-purple-200/50"
    }
  ];

  const stats = [
    {
      icon: <Shield className="w-8 h-8" />,
      value: "100%",
      label: "Open Source",
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      value: "Real-time",
      label: "Market Data",
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "Zerodha",
      label: "MCP Integration",
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      borderColor: "border-orange-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900 font-mono">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                BullsEye
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Features</a>
                <a href="#demo" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">Demo</a>
                <a href="#docs" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300">Docs</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 px-3 py-2 rounded-xl hover:bg-gray-100"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a 
                href="/chat"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Started</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            BullsEye
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            AI-powered financial chat engine built on <span className="text-orange-600 font-semibold">Zerodha MCP</span>. 
            Analyze markets, manage portfolios, and execute trades through intelligent conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a 
              href="/chat"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Start Trading</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1">
              <ExternalLink className="w-4 h-4" />
              <span>View Demo</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">Core Features</h2>
          <p className="text-gray-600 text-lg">Everything you need for intelligent trading decisions</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.bgColor} ${feature.borderColor} border-2 p-8 rounded-3xl ${feature.hoverShadow} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
            >
              <div className={`mb-6 ${feature.color} bg-white rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Preview */}
      <section id="demo" className="bg-gradient-to-r from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">Natural Language Trading</h3>
            <p className="text-gray-600">See how BullsEye understands and responds to your trading queries</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md border-2 border-gray-200 p-8 rounded-3xl shadow-2xl">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 p-6 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">You</div>
                </div>
                <div className="text-gray-700 font-medium">"What's the current trend for RELIANCE? Should I buy more?"</div>
              </div>
              
              <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6 rounded-2xl transform hover:scale-105 transition-transform duration-300 shadow-xl">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-gray-200">BullsEye AI</div>
                </div>
                <div className="text-gray-100">
                  <span className="text-emerald-400 font-semibold">RELIANCE</span> is showing strong upward momentum (<span className="text-green-400">+2.3%</span> today). Based on technical analysis and your portfolio allocation, I recommend a moderate position. Current price: <span className="text-yellow-400 font-semibold">₹2,847</span>. Would you like me to execute a buy order?
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 p-6 rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">You</div>
                </div>
                <div className="text-gray-700 font-medium">"Yes, buy 10 shares"</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.bgColor} ${stat.borderColor} border-2 p-8 text-center rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
            >
              <div className={`flex justify-center mb-4 ${stat.color} bg-white rounded-2xl w-16 h-16 mx-auto items-center shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 text-gray-900">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Ready to Start Trading with AI?</h2>
            <p className="text-gray-300 mb-10 text-lg">
              Experience the future of conversational trading with intelligent market analysis
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/chat"
                className="bg-gradient-to-r from-white to-blue-100 text-gray-900 px-8 py-4 rounded-2xl hover:from-blue-50 hover:to-purple-100 transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Start Trading Now</span>
              </a>
              <a 
                href="https://github.com"
                className="border-2 border-gray-600 text-white px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm transform hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-white to-gray-50 border-t-2 border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600">
              © 2025 <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BullsEye</span>. Open source financial chat engine.
            </div>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-blue-50">GitHub</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-purple-50">Documentation</a>
              <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-emerald-50">API</a>
              <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-orange-50">License</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}