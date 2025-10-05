import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CompanySearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  // Mock data for companies
  useEffect(() => {
    const mockCompanies = [
      {
        id: '1',
        name: 'TechCorp Security',
        description: 'Leading technology company focused on secure software development',
        industry: 'Technology',
        website: 'https://techcorp.com',
        bugReportsCount: 12,
        isActive: true,
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'StartupXYZ',
        description: 'Innovative startup building the next generation of mobile applications',
        industry: 'Technology',
        website: 'https://startupxyz.com',
        bugReportsCount: 8,
        isActive: true,
        createdAt: '2024-02-01'
      },
      {
        id: '3',
        name: 'FinanceFlow',
        description: 'Financial services platform for small and medium businesses',
        industry: 'Finance',
        website: 'https://financeflow.com',
        bugReportsCount: 5,
        isActive: true,
        createdAt: '2024-01-20'
      },
      {
        id: '4',
        name: 'HealthTech Solutions',
        description: 'Healthcare technology solutions for patient management',
        industry: 'Healthcare',
        website: 'https://healthtech.com',
        bugReportsCount: 15,
        isActive: true,
        createdAt: '2024-01-10'
      },
      {
        id: '5',
        name: 'EduPlatform',
        description: 'Online learning platform for educational institutions',
        industry: 'Education',
        website: 'https://eduplatform.com',
        bugReportsCount: 3,
        isActive: true,
        createdAt: '2024-02-15'
      }
    ];
    setCompanies(mockCompanies);
    setFilteredCompanies(mockCompanies);
  }, []);

  useEffect(() => {
    const filtered = companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, companies]);

  const getIndustryColor = (industry) => {
    const colors = {
      'Technology': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Finance': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Healthcare': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Education': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'E-commerce': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return colors[industry] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find Companies to Report Bugs
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Search for companies and submit security vulnerability reports to help improve their security posture
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              placeholder="Search companies by name, description, or industry..."
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-400">
            {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'} found
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative">
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {company.name}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getIndustryColor(company.industry)}`}>
                      {company.industry}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {company.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{company.bugReportsCount} reports received</span>
                  </div>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                    >
                      Visit Website
                    </a>
                  )}
                </div>

                {/* Action Button */}
                <Link
                  to={`/submit-bug-report/${company.id}`}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                  Submit Bug Report
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No companies found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or browse all companies</p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Don't see your company?
            </h2>
            <p className="text-gray-300 mb-6">
              Encourage your company to join BugBridge to start receiving security reports
            </p>
            <Link
              to="/register?type=company"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Company Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySearch;
