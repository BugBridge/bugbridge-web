import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockCompanies, mockBugReports } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';

const Dashboard = () => {
  const { state, dispatch } = useApp();
  const [activeSection, setActiveSection] = useState('my-reports');
  const [bugReports] = useState(mockBugReports);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'under_review': return 'text-blue-400';
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const sections = [
    { id: 'my-reports', label: 'My Reports', icon: '📋' },
    { id: 'company-search', label: 'Find Companies', icon: '🔍' },
    { id: 'company-management', label: 'My Company', icon: '🏢' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderMyReports = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Bug Reports</h2>
          <p className="text-slate-400 mt-1">Track your submitted security reports and their status</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-400">
            {bugReports.length} reports submitted
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        {bugReports.map((report) => (
          <div key={report.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                  <SeverityBadge severity={report.severity} />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
                <p className="text-slate-300 mb-4 leading-relaxed">{report.description}</p>
                <div className="flex items-center space-x-6 text-sm text-slate-400">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Submitted: {report.submittedAt}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>{report.attachments.length} attachments</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Link
                  to={`/report-details/${report.id}`}
                  className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {bugReports.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-white mb-2">No reports submitted yet</h3>
            <p className="mb-6">Start by finding companies and submitting your first security report</p>
            <button
              onClick={() => setActiveSection('company-search')}
              className="btn-primary"
            >
              Find Companies
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderCompanySearch = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Find Companies</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-slate-400">
            {mockCompanies.length} companies accepting reports
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search companies by name, industry, or description..."
          className="input-field w-full pl-12"
        />
        <svg className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6">
        {mockCompanies.map((company) => (
          <div key={company.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{company.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{company.name}</h3>
                  <p className="text-slate-400">{company.industry} • {company.bugReportsCount} reports received</p>
                  <p className="text-slate-300 mt-2">{company.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                  Accepting Reports
                </span>
                <Link
                  to={`/report/${company.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Submit Report
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center space-x-4">
                {company.website && (
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Visit Website</span>
                  </a>
                )}
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Joined: {company.createdAt}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompanyManagement = () => {
    if (state.companyProfile) {
      // User has a company - show company management
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">My Company</h2>
            <Link
              to="/onboarding"
              className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium"
            >
              Edit Company
            </Link>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{state.companyProfile.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{state.companyProfile.name}</h3>
                <p className="text-slate-400">{state.companyProfile.industry}</p>
                <p className="text-slate-300 mt-2">{state.companyProfile.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">
                  {Array.isArray(state.bugReports) ? 
                    state.bugReports.filter(r => r.companyId === state.companyProfile?.id).length : 0}
                </div>
                <div className="text-sm text-slate-400">Reports Received</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400 mb-1">Active</div>
                <div className="text-sm text-slate-400">Status</div>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400 mb-1">@{state.user?.username}</div>
                <div className="text-sm text-slate-400">Your Username</div>
              </div>
            </div>
          </div>

          {/* Company Reports Section */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reports Received by Your Company</h3>
            <div className="space-y-4">
              {bugReports.filter(report => report.companyName === state.companyProfile.name).map((report) => (
                <div key={report.id} className="bg-slate-700/30 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-white">{report.title}</h4>
                        <SeverityBadge severity={report.severity} />
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </span>
                      </div>
                      <p className="text-slate-300 mb-3">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Submitted: {report.submittedAt}</span>
                        <span>Attachments: {report.attachments.length}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Link
                        to={`/report-details/${report.id}`}
                        className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium"
                      >
                        View Details
                      </Link>
                      <button className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium">
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {bugReports.filter(report => report.companyName === state.companyProfile.name).length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No reports received yet</p>
                  <p className="text-sm mt-1">Security researchers will submit reports to your company</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      // User doesn't have a company - show options
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">My Company</h2>
          </div>

          <div className="grid gap-6">
            {/* Create Company Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Create Your Own Company</h3>
                    <p className="text-slate-400">Set up a company profile to start receiving security reports</p>
                  </div>
                </div>
                <Link
                  to="/onboarding"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Create Company
                </Link>
              </div>
            </div>

            {/* Join Company Card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Join an Existing Company</h3>
                    <p className="text-slate-400">Get invited by a company owner using your username</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 mb-2">Your username:</p>
                  <p className="text-lg font-semibold text-blue-400">@{state.user?.username}</p>
                </div>
              </div>
            </div>

            {/* Pending Invites */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Pending Invitations</h3>
              <div className="text-center py-8 text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p>No pending invitations</p>
                <p className="text-sm mt-1">Company owners can invite you using your username</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };


  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      
      <div className="grid gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                value={state.user?.name || ''}
                className="input-field w-full"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
              <input
                type="text"
                value={state.user?.username || ''}
                className="input-field w-full"
                readOnly
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={state.user?.email || ''}
              className="input-field w-full"
              readOnly
            />
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="text-slate-300">Email notifications for report updates</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="text-slate-300">Weekly summary reports</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500" />
              <span className="text-slate-300">Marketing communications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );


  const renderContent = () => {
    switch (activeSection) {
      case 'my-reports':
        return renderMyReports();
      case 'company-search':
        return renderCompanySearch();
      case 'company-management':
        return renderCompanyManagement();
      case 'settings':
        return renderSettings();
      default:
        return renderMyReports();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-xl text-slate-300">
            Welcome back, {state.user?.name || 'User'}! Manage your security reports and company settings.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
