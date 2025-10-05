import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Subtle3DCard from '../components/Subtle3DCard';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { IconShield, IconBug, IconUsers, IconRocket, IconCheck, IconClock, IconAlertTriangle, IconBuilding, IconSearch } from '@tabler/icons-react';

const Home = () => {
  const { state } = useApp();
  

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Floating Badge */}
            <motion.div 
              className={cn(
                "inline-flex items-center px-4 py-2 border rounded-full text-sm mb-8 backdrop-blur-sm",
                "bg-slate-800/50 border-slate-700 text-gray-300"
              )}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              Streamline your bug reporting process
            </motion.div>
            
            {state.user ? (
              <>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-8 leading-relaxed"
                  variants={fadeInUp}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    variants={fadeInUp}
                  >
                    Welcome back,
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-4"
                    variants={fadeInUp}
                  >
                    {state.user.name}!
                  </motion.span>
                  <motion.span 
                    className="block text-2xl text-gray-300 mt-6 font-normal"
                    variants={fadeInUp}
                  >
                    Ready to continue your security journey?
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                  variants={fadeInUp}
                >
                  Manage your security reports, collaborate with companies, and track the progress of your vulnerability submissions.
                </motion.p>
              </>
            ) : (
              <>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-8 leading-relaxed"
                  variants={fadeInUp}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
                    variants={fadeInUp}
                  >
                    Anonymous, secure, and AI-assisted
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-4"
                    variants={fadeInUp}
                  >
                    vulnerability reporting
                  </motion.span>
                  <motion.span 
                    className="block text-2xl text-gray-300 mt-6 font-normal"
                    variants={fadeInUp}
                  >
                    for startups and SMEs
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
                  variants={fadeInUp}
                >
                  Connect companies with security researchers for safe vulnerability reporting and tracking. 
                  AI-assisted triage prioritizes reports and provides actionable insights for better security.
                </motion.p>
              </>
            )}
            
              {state.user ? (
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                  variants={fadeInUp}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/dashboard" 
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                    >
                      <IconRocket className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Go to Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/dashboard" 
                      className="group inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-300 text-lg backdrop-blur-sm hover:border-slate-600 transform hover:-translate-y-1"
                    >
                      <IconSearch className="w-5 h-5 mr-2" />
                      View My Reports
                    </Link>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
                  variants={fadeInUp}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                            <Link
                              to="/signup"
                              className={cn(
                                "group relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-300 text-lg shadow-2xl transform hover:-translate-y-1",
                                "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-500/25"
                              )}
                            >
                      <IconRocket className="w-5 h-5 mr-2" />
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/login" 
                      className="group inline-flex items-center justify-center px-8 py-4 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-300 text-lg backdrop-blur-sm hover:border-slate-600 transform hover:-translate-y-1"
                    >
                      <IconUsers className="w-5 h-5 mr-2" />
                      Sign In
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            
            <motion.div 
              className="flex items-center justify-center space-x-8 text-sm text-gray-400"
              variants={fadeInUp}
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <IconCheck className="w-5 h-5 text-green-400 mr-2" />
                <span>Efficient report tracking</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IconClock className="w-5 h-5 text-blue-400 mr-2" />
                </motion.div>
                <span>24/7 AI-powered triage</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-sm text-red-400 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              The Problem
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              The security reporting challenge
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Both companies and security researchers face significant barriers in the vulnerability reporting process
            </p>
          </div>
          
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconBuilding className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white">For Companies</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Expensive enterprise security tools out of reach for SMEs</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>No clear process for receiving security reports</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Overwhelmed by low-quality or duplicate reports</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Lack of security expertise to triage vulnerabilities</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconAlertTriangle className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white">For Security Researchers</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Fear of legal repercussions for reporting vulnerabilities</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>No clear way to contact companies about security issues</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Reports ignored or dismissed without proper evaluation</span>
                    </li>
                    <li className="flex items-start group/item">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-2 group-hover/item:scale-150 transition-transform duration-200"></div>
                      <span>Lack of recognition or compensation for responsible disclosure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </section>

       {/* How It Works Section */}
       <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-6">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
               How It Works
             </div>
             <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-relaxed">
               How BugBridge Works
             </h2>
             <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               A simple, secure process that connects companies with security researchers
             </p>
           </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <Subtle3DCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                    <IconBuilding className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Create Company</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Companies create their profile and set up a standard bug report page
                  </p>
                </div>
              </Subtle3DCard>

              {/* Card 2 */}
              <Subtle3DCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                    <IconBug className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Submit Report</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Users find companies and submit detailed vulnerability reports
                  </p>
                </div>
              </Subtle3DCard>

              {/* Card 3 */}
              <Subtle3DCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                    <IconShield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">AI Triage</h3>
                  <p className="text-gray-300 leading-relaxed">
                    AI analyzes and prioritizes reports by severity and business impact
                  </p>
                </div>
              </Subtle3DCard>

              {/* Card 4 */}
              <Subtle3DCard>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                    <IconCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Track & Resolve</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Companies track and manage reports with actionable remediation guidance
                  </p>
                </div>
              </Subtle3DCard>
            </div>
         </div>
       </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm text-green-400 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why choose BugBridge?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built specifically for startups and SMEs with affordability and ease of use in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Anonymous & Secure</h3>
                <p className="text-gray-300 leading-relaxed">
                  Researchers can report vulnerabilities anonymously while maintaining secure communication channels
                </p>
              </div>
            </div>
            
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">AI-Assisted Triage</h3>
                <p className="text-gray-300 leading-relaxed">
                  Intelligent prioritization of reports by severity and business impact, saving time and resources
                </p>
              </div>
            </div>
            
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Standard Bug Report Pages</h3>
                <p className="text-gray-300 leading-relaxed">
                  Each company gets a dedicated bug report page with customizable templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-400 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Live Preview
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              See BugBridge in action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get a preview of how companies and users interact with the platform
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Company Dashboard Preview */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-400">Company Dashboard</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-red-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white">Authentication Bypass</h4>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold border border-red-500/30">HIGH</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">SQL injection in login endpoint allows unauthorized access</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Submitted: 2 hours ago
                      </span>
                      <span className="text-blue-400">Under Review</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-yellow-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white">XSS in Contact Form</h4>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold border border-yellow-500/30">MEDIUM</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Stored XSS vulnerability in contact form</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Submitted: 1 day ago
                      </span>
                      <span className="text-green-400">Accepted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Dashboard Preview */}
            <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">User Dashboard</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white">TechCorp Security</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">Web application security testing program</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Reports: 12
                      </span>
                      <span className="text-green-400">Open</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white">StartupXYZ Mobile</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">iOS/Android vulnerability assessment</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Reports: 8
                      </span>
                      <span className="text-green-400">Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400 mb-8 backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ready to get started?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-relaxed">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Ready to improve your
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-2">
              security posture?
            </span>
          </h2>
          {state.user ? (
            <>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Welcome back, {state.user.name}! Continue managing your security reports and collaborating with companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to="/dashboard" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Go to Dashboard</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="group inline-flex items-center justify-center px-10 py-5 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-300 text-lg backdrop-blur-sm hover:border-slate-600 transform hover:-translate-y-1"
                >
                  View My Reports
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of companies and security researchers who trust BugBridge for 
                secure, anonymous vulnerability reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to="/register" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  to="/login" 
                  className="group inline-flex items-center justify-center px-10 py-5 bg-slate-800/50 border border-slate-700 text-white font-semibold rounded-xl hover:bg-slate-700/50 transition-all duration-300 text-lg backdrop-blur-sm hover:border-slate-600 transform hover:-translate-y-1"
                >
                  Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  BugBridge
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Anonymous, secure, and AI-assisted vulnerability reporting for startups and SMEs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/register?type=company" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  For Companies
                </Link></li>
                <li><Link to="/register?type=user" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-green-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  For General Users
                </Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Sign In
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-yellow-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Privacy Policy
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Terms of Service
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact Us
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Help Center
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 BugBridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
