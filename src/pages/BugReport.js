import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockCompanies } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';

const BugReport = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    stepsToReproduce: '',
    expectedBehavior: '',
    additionalInfo: '',
    reporterName: '',
    reporterEmail: '',
    attachments: []
  });

  useEffect(() => {
    // Find company by ID
    const foundCompany = mockCompanies.find(c => c.id === parseInt(companyId));
    if (foundCompany) {
      setCompany(foundCompany);
      // Pre-fill template if available
      if (foundCompany.bugReportTemplate) {
        setFormData(prev => ({
          ...prev,
          title: foundCompany.bugReportTemplate.title,
          description: foundCompany.bugReportTemplate.description,
          stepsToReproduce: foundCompany.bugReportTemplate.stepsToReproduce,
          expectedBehavior: foundCompany.bugReportTemplate.expectedBehavior,
          additionalInfo: foundCompany.bugReportTemplate.additionalInfo
        }));
      }
    }
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files]
    });
  };

  const removeAttachment = (index) => {
    setFormData({
      ...formData,
      attachments: formData.attachments.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Bug report submitted successfully! Thank you for helping improve security.');
      navigate('/dashboard');
    }, 2000);
  };

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Company Not Found</h2>
          <p className="text-slate-400 mb-6">The company you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white">Security Vulnerability Report</h1>
          </div>
          <p className="text-xl text-slate-300 mb-2">Report a security issue to <span className="font-semibold text-blue-400">{company.name}</span></p>
          <p className="text-slate-400">{company.description}</p>
        </div>

        {/* Company Info Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{company.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{company.name}</h3>
                <p className="text-slate-400">{company.industry} • {company.bugReportsCount} reports received</p>
                {company.website && (
                  <a 
                    href={company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                Accepting Reports
              </span>
            </div>
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Submission Guidelines</h4>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Provide clear, detailed steps to reproduce the vulnerability</li>
                <li>• Include screenshots or proof-of-concept code when possible</li>
                <li>• Do not attempt to exploit the vulnerability beyond what's necessary to demonstrate it</li>
                <li>• Allow reasonable time for the company to respond and fix the issue</li>
                <li>• Do not publicly disclose the vulnerability until it has been resolved</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anonymous Reporting Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/50">
              <div>
                <h3 className="text-lg font-semibold text-white">Anonymous Reporting</h3>
                <p className="text-slate-400 text-sm">Submit your report without revealing your identity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Bug Report Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Bug Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                  placeholder="Brief description of the vulnerability"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-field w-full"
                  placeholder="Detailed description of the vulnerability..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Severity Level *
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  required
                  className="input-field w-full"
                >
                  <option value="low">Low - Minor issue with limited impact</option>
                  <option value="medium">Medium - Moderate issue with some impact</option>
                  <option value="high">High - Significant issue with major impact</option>
                  <option value="critical">Critical - Severe issue with critical impact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Steps to Reproduce *
                </label>
                <textarea
                  name="stepsToReproduce"
                  value={formData.stepsToReproduce}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="input-field w-full"
                  placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Expected vs Actual Behavior *
                </label>
                <textarea
                  name="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="input-field w-full"
                  placeholder="Expected: What should happen&#10;Actual: What actually happens"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  className="input-field w-full"
                  placeholder="Any additional context, screenshots, or information..."
                />
              </div>

              {/* File Attachments */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".png,.jpg,.jpeg,.gif,.pdf,.txt,.log"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-slate-400 mb-2">Click to upload files or drag and drop</p>
                    <p className="text-slate-500 text-sm">PNG, JPG, PDF, TXT up to 10MB each</p>
                  </label>
                </div>
                
                {formData.attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-slate-300 text-sm">{file.name}</span>
                          <span className="text-slate-500 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reporter Information (if not anonymous) */}
              {!isAnonymous && (
                <div className="space-y-4 pt-6 border-t border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white">Your Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="reporterName"
                        value={formData.reporterName}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="reporterEmail"
                        value={formData.reporterEmail}
                        onChange={handleChange}
                        required
                        className="input-field w-full"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-slate-800/50 border border-slate-700 text-white rounded-xl hover:bg-slate-700/50 transition-all duration-300"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLoading
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {isLoading ? 'Submitting Report...' : 'Submit Security Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BugReport;
