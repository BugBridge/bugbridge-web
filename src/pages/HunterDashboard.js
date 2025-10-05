import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockCompanies, mockBugReports } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';
import BugReportModal from '../components/BugReportModal';

const UserDashboard = () => {
  const { dispatch } = useApp();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [companies] = useState(mockCompanies);
  const [bugReports] = useState(mockBugReports);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'under_review':
        return 'text-blue-400';
      case 'accepted':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-white mb-3">User Dashboard</h1>
                <p className="text-xl text-slate-300">Browse companies and track your security reports</p>
            </div>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Submit Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">Available Companies</p>
                <p className="text-3xl font-bold text-white">{companies.length}</p>
                <p className="text-xs text-blue-400 mt-1">+3 new this week</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">Reports Submitted</p>
                <p className="text-3xl font-bold text-white">{bugReports.length}</p>
                <p className="text-xs text-green-400 mt-1">+2 this month</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">Under Review</p>
                <p className="text-3xl font-bold text-white">
                  {bugReports.filter(r => r.status === 'under_review').length}
                </p>
                <p className="text-xs text-yellow-400 mt-1">Avg. 1.8 days</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">Accepted Reports</p>
                <p className="text-3xl font-bold text-white">
                  {bugReports.filter(r => r.status === 'accepted').length}
                </p>
                <p className="text-xs text-purple-400 mt-1">Validated findings</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Available Companies</h2>
              <p className="text-slate-400">Browse companies accepting security vulnerability reports</p>
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid gap-8">
            {companies.map((company) => (
              <div key={company.id} className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">{company.name}</h3>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold border border-blue-500/30">
                        {company.industry.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4 text-lg leading-relaxed">{company.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{company.bugReportsCount} reports received</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Joined: {company.createdAt}</span>
                      </div>
                      {company.website && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            Visit Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-3xl font-bold text-green-400">Open</div>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                      Submit Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Reports Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">My Security Reports</h2>
              <p className="text-slate-400">Track your submissions and their status</p>
            </div>
          </div>
          
          <div className="grid gap-6">
            {bugReports.map((report) => (
              <div key={report.id} className="group relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{report.title}</h4>
                    <p className="text-slate-300 mb-4 leading-relaxed">{report.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Company: {report.companyName}</span>
                      </div>
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
                  <div className="flex items-center space-x-3">
                    <SeverityBadge severity={report.severity} />
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {bugReports.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">No reports yet</h3>
                <p className="mb-6">Start your security research journey by submitting your first report</p>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="btn-primary"
                >
                  Submit Your First Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bug Report Modal */}
        <BugReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          companies={companies}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
