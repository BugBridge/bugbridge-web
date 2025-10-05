import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockCompanies, mockBugReports } from '../data/mockData';
import SeverityBadge from '../components/SeverityBadge';
import { StatCard } from '../components/ui/stat-card';
import { DataTable } from '../components/ui/data-table';
import { Sidebar } from '../components/ui/sidebar';
import { cn } from '../lib/utils';
import { 
  IconBug, 
  IconBuilding, 
  IconTrendingUp, 
  IconClock, 
  IconSearch,
  IconPlus,
  IconSettings,
  IconUser,
  IconFileText,
  IconShield
} from '@tabler/icons-react';

const ModernDashboard = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [bugReports] = useState(mockBugReports);
  const [companySearchTerm, setCompanySearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(mockCompanies);

  // Filter companies based on search term
  React.useEffect(() => {
    if (companySearchTerm.trim() === '') {
      setFilteredCompanies(mockCompanies);
    } else {
      const filtered = mockCompanies.filter(company =>
        company.name.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(companySearchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(companySearchTerm.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companySearchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'under_review': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'accepted': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'rejected': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusText = (status) => {
    return status.replace('_', ' ').toUpperCase();
  };

  const sidebarItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      description: 'Dashboard summary',
      icon: <IconTrendingUp className="w-5 h-5" />
    },
    { 
      id: 'my-reports', 
      label: 'My Reports', 
      description: 'Your submitted reports',
      icon: <IconFileText className="w-5 h-5" />,
      badge: bugReports.length
    },
    { 
      id: 'company-search', 
      label: 'Find Companies', 
      description: 'Discover companies',
      icon: <IconSearch className="w-5 h-5" />
    },
    { 
      id: 'company-management', 
      label: 'My Company', 
      description: 'Company settings',
      icon: <IconBuilding className="w-5 h-5" />
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      description: 'Account preferences',
      icon: <IconSettings className="w-5 h-5" />
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {state.user?.name || 'User'}!
            </h2>
            <p className="text-slate-300 text-lg">
              Here's what's happening with your security reports today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <IconShield className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Reports"
          value={bugReports.length}
          change="+12%"
          trend="up"
          icon={<IconFileText className="w-6 h-6 text-blue-400" />}
        />
        <StatCard
          title="Pending Review"
          value={bugReports.filter(r => r.status === 'pending').length}
          change="+3"
          trend="up"
          icon={<IconClock className="w-6 h-6 text-yellow-400" />}
        />
        <StatCard
          title="Accepted Reports"
          value={bugReports.filter(r => r.status === 'accepted').length}
          change="+8%"
          trend="up"
          icon={<IconTrendingUp className="w-6 h-6 text-green-400" />}
        />
        <StatCard
          title="Companies Found"
          value={mockCompanies.length}
          change="+2"
          trend="up"
          icon={<IconBuilding className="w-6 h-6 text-purple-400" />}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {bugReports.slice(0, 3).map((report) => (
              <div key={report.id} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <IconBug className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{report.title}</h4>
                  <p className="text-sm text-slate-400">{report.companyName}</p>
                </div>
                <div className="text-right">
                  <span className={cn("px-2 py-1 rounded-full text-xs font-semibold border", getStatusColor(report.status))}>
                    {getStatusText(report.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/report/1"
              className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <IconPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Submit New Report</h4>
                <p className="text-sm text-slate-400">Report a security vulnerability</p>
              </div>
            </Link>
            
            <button
              onClick={() => setActiveSection('company-search')}
              className="w-full flex items-center space-x-3 p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <IconSearch className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">Find Companies</h4>
                <p className="text-sm text-slate-400">Discover companies accepting reports</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyReports = () => {
    const columns = [
      {
        key: 'title',
        title: 'Report Title',
        render: (value, row) => (
          <div>
            <div className="font-semibold text-white">{value}</div>
            <div className="text-sm text-slate-400">{row.companyName}</div>
          </div>
        )
      },
      {
        key: 'severity',
        title: 'Severity',
        render: (value) => <SeverityBadge severity={value} />
      },
      {
        key: 'status',
        title: 'Status',
        render: (value) => (
          <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(value))}>
            {getStatusText(value)}
          </span>
        )
      },
      {
        key: 'submittedAt',
        title: 'Submitted',
        render: (value) => <span className="text-slate-300">{value}</span>
      },
      {
        key: 'actions',
        title: 'Actions',
        render: (_, row) => (
          <button
            onClick={() => navigate(`/report-details/${row.id}`)}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm font-medium"
          >
            View Details
          </button>
        )
      }
    ];

    return (
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

        <DataTable
          data={bugReports}
          columns={columns}
          searchable={true}
          sortable={true}
          onRowClick={(row) => navigate(`/report-details/${row.id}`)}
        />
      </div>
    );
  };

  const renderCompanySearch = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Find Companies</h2>
            <p className="text-slate-400 mt-1">Discover companies accepting security reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-400">
              {filteredCompanies.length} of {mockCompanies.length} companies
            </span>
          </div>
        </div>

        {/* Enhanced Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <IconSearch className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search companies by name, industry, or description..."
            value={companySearchTerm}
            onChange={(e) => setCompanySearchTerm(e.target.value)}
            className="w-full pl-16 pr-16 py-5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg shadow-lg"
          />
          {companySearchTerm && (
            <button
              onClick={() => setCompanySearchTerm('')}
              className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-white transition-colors group"
            >
              <svg className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search Results Info */}
        {companySearchTerm && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-slate-800/30 border border-slate-700/50 rounded-xl px-6 py-3">
              <p className="text-slate-300 text-sm font-medium">
                {filteredCompanies.length === 0 
                  ? 'No companies found matching your search'
                  : `Found ${filteredCompanies.length} compan${filteredCompanies.length === 1 ? 'y' : 'ies'} matching "${companySearchTerm}"`
                }
              </p>
              {filteredCompanies.length > 0 && (
                <button
                  onClick={() => setCompanySearchTerm('')}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}

        {/* Companies Grid */}
        <div className="grid gap-6">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div key={company.id} className="group bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                {/* Company Header */}
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-3xl font-bold text-white">{company.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{company.name}</h3>
                    <p className="text-slate-400 text-lg mb-2">{company.industry}</p>
                    <p className="text-slate-300 leading-relaxed">{company.description}</p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-400 text-sm">Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <IconFileText className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{company.bugReportsCount} reports received</span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Accepting Reports</span>
                  </span>
                </div>

                {/* Action Section */}
                <div className="flex items-center justify-center pt-4 border-t border-slate-700/50">
                  <Link
                    to={`/report/${company.id}`}
                    className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 text-lg min-w-[200px]"
                  >
                    <IconBug className="w-5 h-5 mr-3 group-hover/btn:scale-110 transition-transform duration-200" />
                    <span>Submit Report</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover/btn:opacity-75 transition-opacity duration-300"></div>
                  </Link>
                </div>
                {/* Footer Links */}
                <div className="flex items-center justify-center space-x-6 text-sm text-slate-400 mt-4">
                  {company.website && (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group/link"
                    >
                      <svg className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Visit Website</span>
                    </a>
                  )}
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Joined: {company.createdAt}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <IconSearch className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No companies found</h3>
              <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                {companySearchTerm 
                  ? `No companies match your search for "${companySearchTerm}". Try different keywords or browse all companies.`
                  : 'No companies are currently accepting reports. Check back later for new opportunities.'
                }
              </p>
              {companySearchTerm && (
                <button
                  onClick={() => setCompanySearchTerm('')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 rounded-xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 font-medium border border-blue-500/30 hover:border-blue-500/50 transform hover:-translate-y-1"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderCompanyManagement = () => {
    if (state.companyProfile) {
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

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{state.companyProfile.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{state.companyProfile.name}</h3>
                <p className="text-slate-400">{state.companyProfile.industry}</p>
                <p className="text-slate-300 mt-2">{state.companyProfile.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <StatCard
                title="Reports Received"
                value={state.companyProfile.bugReportsCount}
                icon={<IconFileText className="w-6 h-6 text-blue-400" />}
              />
              <StatCard
                title="Status"
                value="Active"
                icon={<IconShield className="w-6 h-6 text-green-400" />}
              />
              <StatCard
                title="Your Username"
                value={`@${state.user?.username}`}
                icon={<IconUser className="w-6 h-6 text-purple-400" />}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">My Company</h2>
          <div className="grid gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <IconPlus className="w-6 h-6 text-white" />
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
          </div>
        </div>
      );
    }
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>
      
      <div className="grid gap-6">
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
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
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'my-reports':
        return renderMyReports();
      case 'company-search':
        return renderCompanySearch();
      case 'company-management':
        return renderCompanyManagement();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        activeItem={activeSection}
        onItemClick={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
