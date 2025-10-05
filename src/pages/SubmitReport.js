import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Form, FormGroup, FormLabel, FormInput, FormError } from '../components/ui/form';
import { cn } from '../lib/utils';
import { IconBug, IconBuilding, IconArrowLeft, IconCheck } from '@tabler/icons-react';

const SubmitReport = () => {
  const { state, createBugReport, loadCompanies, addNotification } = useApp();
  const navigate = useNavigate();
  const { companyId } = useParams();
  
  const [step, setStep] = useState(companyId ? 2 : 1); // 1: Select Company, 2: Submit Report
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    stepsToReproduce: '',
    companyId: companyId || ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Load companies on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadCompanies();
        if (companyId) {
          const company = state.companies.find(c => c.id === companyId);
          if (company) {
            setSelectedCompany(company);
          }
        }
      } catch (error) {
        console.error('Failed to load companies:', error);
        // Don't show error notification for empty companies - this is normal
        if (!error.message.includes('no companies') && !error.message.includes('empty')) {
          addNotification({
            type: 'error',
            title: 'Error',
            message: 'Failed to load companies. Please try again.'
          });
        }
      }
    };
    
    loadData();
  }, [companyId, loadCompanies, state.companies, addNotification]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setFormData(prev => ({ ...prev, companyId: company.id }));
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Report title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.stepsToReproduce.trim()) {
      newErrors.stepsToReproduce = 'Steps to reproduce are required';
    }

    if (!formData.companyId) {
      newErrors.companyId = 'Please select a company';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const reportData = {
        ...formData,
        userId: state.user.id,
        companyName: selectedCompany.name,
        status: 'pending'
      };

      await createBugReport(reportData);

      addNotification({
        type: 'success',
        title: 'Report Submitted!',
        message: `Your security report has been submitted to ${selectedCompany.name}.`
      });

      navigate('/dashboard');
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: error.message || 'Failed to submit report. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCompanySelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
          <IconBuilding className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Select Company</h1>
        <p className="text-slate-400">Choose which company you want to submit a security report to</p>
      </div>

      <div className="grid gap-4 max-w-4xl mx-auto">
        {state.companies.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <IconBuilding className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Companies Available</h3>
            <p className="text-slate-400 mb-6">
              There are currently no companies accepting security reports. Check back later or contact us if you're a company owner.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700/70 transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          state.companies.map((company) => (
          <div
            key={company.id}
            onClick={() => handleCompanySelect(company)}
            className="group bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-lg font-bold text-white">{company.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{company.name}</h3>
                <p className="text-slate-400 text-sm mb-2">{company.industry}</p>
                <p className="text-slate-300 text-sm line-clamp-2">{company.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30">
                  Accepting Reports
                </span>
                <IconArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );

  const renderReportForm = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => setStep(1)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <IconArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Submit Security Report</h1>
          <p className="text-slate-400">Report a security vulnerability to {selectedCompany?.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <FormGroup>
          <FormLabel htmlFor="title">Report Title</FormLabel>
          <FormInput
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Brief description of the security issue"
            className={cn(errors.title && "border-red-500")}
          />
          {errors.title && <FormError>{errors.title}</FormError>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="severity">Severity Level</FormLabel>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="low">Low - Minor security issue</option>
            <option value="medium">Medium - Moderate security concern</option>
            <option value="high">High - Significant security vulnerability</option>
            <option value="critical">Critical - Severe security flaw</option>
          </select>
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the security vulnerability..."
            rows={6}
            className={cn(
              "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none",
              errors.description && "border-red-500"
            )}
          />
          {errors.description && <FormError>{errors.description}</FormError>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="stepsToReproduce">Steps to Reproduce</FormLabel>
          <textarea
            id="stepsToReproduce"
            name="stepsToReproduce"
            value={formData.stepsToReproduce}
            onChange={handleChange}
            placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
            rows={6}
            className={cn(
              "w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none",
              errors.stepsToReproduce && "border-red-500"
            )}
          />
          {errors.stepsToReproduce && <FormError>{errors.stepsToReproduce}</FormError>}
        </FormGroup>

        <div className="flex items-center justify-between pt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-6 py-3 text-slate-300 hover:text-white transition-colors font-medium"
          >
            Back to Company Selection
          </button>
          
          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Submitting...
              </div>
            ) : (
              <div className="flex items-center">
                <IconBug className="w-5 h-5 mr-2" />
                Submit Report
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto py-8">
        {step === 1 ? renderCompanySelection() : renderReportForm()}
      </div>
    </div>
  );
};

export default SubmitReport;
