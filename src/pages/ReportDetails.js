import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SeverityBadge from '../components/SeverityBadge';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReportDetails = async () => {
      try {
        setIsLoading(true);
        
        // First try to find the report in the current state
        let foundReport = Array.isArray(state.bugReports) ? 
          state.bugReports.find(r => r.id === id) : null;
        
        // If not found in state, try to fetch from API
        if (!foundReport) {
          try {
            // Import apiService dynamically to avoid circular imports
            const { default: apiService } = await import('../services/api');
            foundReport = await apiService.getBugReport(id);
          } catch (apiError) {
            console.error('Failed to fetch report from API:', apiError);
            foundReport = null;
          }
        }
        
        if (foundReport) {
          setReport(foundReport);
          
          // Mock comments data for now (in a real app, you'd fetch from API)
          setComments([
            {
              id: 1,
              author: 'Security Team',
              authorType: 'company',
              content: 'Thank you for submitting this report. We are currently reviewing the vulnerability and will provide updates soon.',
              timestamp: new Date().toLocaleString(),
              isInternal: false
            },
            {
              id: 2,
              author: state.user?.name || 'You',
              authorType: 'user',
              content: 'I can provide additional details about the reproduction steps if needed.',
              timestamp: new Date().toLocaleString(),
              isInternal: false
            }
          ]);
        } else {
          // Report not found
          setReport(null);
        }
      } catch (error) {
        console.error('Failed to load report details:', error);
        setReport(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadReportDetails();
  }, [id, state.user, state.bugReports]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: state.user?.name || 'You',
      authorType: 'user',
      content: newComment,
      timestamp: new Date().toLocaleString(),
      isInternal: false
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Report Not Found</h2>
          <p className="text-slate-400 mb-6">The report you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Additional safety check for report object structure
  if (typeof report !== 'object' || report === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Invalid Report Data</h2>
          <p className="text-slate-400 mb-6">The report data is corrupted or invalid.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">{report.title || 'Untitled Report'}</h1>
          <div className="flex items-center space-x-4">
            <SeverityBadge severity={report.severity || 'medium'} />
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status || 'pending')}`}>
              {getStatusText(report.status || 'pending')}
            </span>
            <span className="text-slate-400">Submitted: {report.submittedAt || 'Unknown'}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Details */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Report Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-slate-300 leading-relaxed">{report.description || 'No description provided'}</p>
                </div>
                
                {report.stepsToReproduce && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Steps to Reproduce</h3>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <p className="text-slate-300 whitespace-pre-wrap">{report.stepsToReproduce}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
                  <p className="text-slate-300">This vulnerability could expose sensitive system information to attackers, potentially leading to further exploitation.</p>
                </div>

                {report.attachments && report.attachments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {report.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span className="text-slate-300">{attachment}</span>
                          <button className="text-blue-400 hover:text-blue-300 text-sm">Download</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Discussion</h2>
              
              {/* Comments List */}
              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        comment.authorType === 'company' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-green-500 text-white'
                      }`}>
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-white">{comment.author}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            comment.authorType === 'company' 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {comment.authorType === 'company' ? 'Company' : 'Reporter'}
                          </span>
                          <span className="text-slate-400 text-sm">{comment.timestamp}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Add a comment
                  </label>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Ask questions, provide updates, or discuss the report..."
                    className="input-field w-full h-24 resize-none"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Report Info */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Report Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-sm">Report ID</span>
                  <p className="text-white font-mono">#{report.id || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Company</span>
                  <p className="text-white">{report.companyName || 'Unknown Company'}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Severity</span>
                  <div className="mt-1">
                    <SeverityBadge severity={report.severity || 'medium'} />
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Status</span>
                  <p className={`font-semibold ${getStatusColor(report.status || 'pending')}`}>
                    {getStatusText(report.status || 'pending')}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-sm">Submitted</span>
                  <p className="text-white">{report.submittedAt || 'Unknown'}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium">
                  Download Report
                </button>
                <button className="w-full px-4 py-2 bg-slate-600/20 text-slate-400 rounded-lg hover:bg-slate-600/30 transition-colors text-sm font-medium">
                  Share Report
                </button>
                {state.companyProfile && (
                  <button className="w-full px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm font-medium">
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
