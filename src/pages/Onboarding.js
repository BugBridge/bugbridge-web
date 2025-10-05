import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Onboarding = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const [formData, setFormData] = useState({
    // Company Information
    name: '',
    industry: '',
    website: '',
    description: '',
    
    // Bug Report Template
    template: {
      title: 'Brief description of the vulnerability',
      description: 'Detailed description of the vulnerability...',
      severity: 'medium',
      stepsToReproduce: '1. Go to...\n2. Click on...\n3. Observe...',
      expectedBehavior: 'Expected: What should happen\nActual: What actually happens',
      additionalInfo: 'Any additional context, screenshots, or information...'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('template.')) {
      const templateField = name.split('.')[1];
      setFormData({
        ...formData,
        template: {
          ...formData.template,
          [templateField]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If we're on step 3, show confirmation instead of submitting
    if (currentStep === 3) {
      setShowConfirmation(true);
      return;
    }
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const companyProfile = {
        id: Date.now(),
        name: formData.name,
        industry: formData.industry,
        website: formData.website,
        description: formData.description,
        bugReportTemplate: formData.template,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
        bugReportsCount: 0
      };

      dispatch({
        type: 'SET_COMPANY_PROFILE',
        payload: companyProfile
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          title: 'Company Profile Created',
          message: 'Your company profile has been set up successfully!'
        }
      });

      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const steps = [
    { id: 1, title: 'Company Information', description: 'Basic details about your company' },
    { id: 2, title: 'Bug Report Template', description: 'Customize how users submit reports' },
    { id: 3, title: 'Review & Complete', description: 'Review your settings and go live' }
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Company Information</h2>
        <p className="text-slate-400">Tell us about your company so users can find and report security issues.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Industry *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="input-field w-full"
          >
            <option value="">Select industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Education">Education</option>
            <option value="Government">Government</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Website
        </label>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="input-field w-full"
          placeholder="https://yourcompany.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">
          Company Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="input-field w-full"
          placeholder="Describe your company and what you do..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Bug Report Template</h2>
        <p className="text-slate-400">Customize the template that security researchers will see when submitting reports.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Report Title Template
          </label>
          <input
            type="text"
            name="template.title"
            value={formData.template.title}
            onChange={handleChange}
            className="input-field w-full"
            placeholder="Brief description of the vulnerability"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Description Template
          </label>
          <textarea
            name="template.description"
            value={formData.template.description}
            onChange={handleChange}
            rows={3}
            className="input-field w-full"
            placeholder="Detailed description of the vulnerability..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Steps to Reproduce Template
          </label>
          <textarea
            name="template.stepsToReproduce"
            value={formData.template.stepsToReproduce}
            onChange={handleChange}
            rows={4}
            className="input-field w-full"
            placeholder="1. Go to...&#10;2. Click on...&#10;3. Observe..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Expected vs Actual Behavior Template
          </label>
          <textarea
            name="template.expectedBehavior"
            value={formData.template.expectedBehavior}
            onChange={handleChange}
            rows={3}
            className="input-field w-full"
            placeholder="Expected: What should happen&#10;Actual: What actually happens"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2">
            Additional Information Template
          </label>
          <textarea
            name="template.additionalInfo"
            value={formData.template.additionalInfo}
            onChange={handleChange}
            rows={3}
            className="input-field w-full"
            placeholder="Any additional context, screenshots, or information..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Review & Complete</h2>
        <p className="text-slate-400">Review your company profile and bug report template before going live.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-400">Company Name:</span>
              <p className="text-white font-medium">{formData.name || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-slate-400">Industry:</span>
              <p className="text-white font-medium">{formData.industry || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-slate-400">Website:</span>
              <p className="text-white font-medium">{formData.website || 'Not specified'}</p>
            </div>
            <div>
              <span className="text-sm text-slate-400">Description:</span>
              <p className="text-white font-medium">{formData.description || 'Not specified'}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Bug Report Template</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-slate-400">Title Template:</span>
              <p className="text-white font-medium text-sm">{formData.template.title}</p>
            </div>
            <div>
              <span className="text-sm text-slate-400">Description Template:</span>
              <p className="text-white font-medium text-sm">{formData.template.description}</p>
            </div>
            <div>
              <span className="text-sm text-slate-400">Steps Template:</span>
              <p className="text-white font-medium text-sm">{formData.template.stepsToReproduce}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-2">You're almost ready!</h4>
            <p className="text-slate-300">
              Once you complete this setup, your company will be visible to security researchers who can submit vulnerability reports. 
              You can always update these settings later from your dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.industry && formData.description;
      case 2:
        return true; // Template fields are optional
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Company Setup</h2>
              <p className="text-slate-400">Please review your company profile before going live</p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Company Summary */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Company Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-slate-400">Company Name:</span>
                    <p className="text-white font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Industry:</span>
                    <p className="text-white font-medium">{formData.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Website:</span>
                    <p className="text-white font-medium">{formData.website || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Description:</span>
                    <p className="text-white font-medium text-sm">{formData.description}</p>
                  </div>
                </div>
              </div>

              {/* Template Summary */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Bug Report Template</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-slate-400">Title Template:</span>
                    <p className="text-white font-medium text-sm">{formData.template.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Description Template:</span>
                    <p className="text-white font-medium text-sm">{formData.template.description}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Steps Template:</span>
                    <p className="text-white font-medium text-sm whitespace-pre-line">{formData.template.stepsToReproduce}</p>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Important Notice</h4>
                    <p className="text-slate-300 text-sm">
                      Once you confirm, your company will be visible to security researchers who can submit vulnerability reports. 
                      You can always update these settings later from your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleCancelConfirmation}
                disabled={isLoading}
                className="px-6 py-3 bg-slate-700/50 border border-slate-600 text-white rounded-xl hover:bg-slate-600/50 transition-all duration-300 disabled:opacity-50"
              >
                Go Back
              </button>
              
              <button
                onClick={handleConfirmSubmit}
                disabled={isLoading}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isLoading
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Profile...
                  </div>
                ) : (
                  'Confirm & Create Profile'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Company Setup</h1>
          <p className="text-xl text-slate-300">Set up your company profile to start receiving security reports</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-600 text-slate-400'
                }`}>
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-slate-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            {renderCurrentStep()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-800/50 border border-slate-700 text-white hover:bg-slate-700/50'
                }`}
              >
                Previous
              </button>

              <div className="flex items-center space-x-4">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      canProceed()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !canProceed()}
                    className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isLoading || !canProceed()
                        ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
                    }`}
                  >
                    {isLoading ? 'Creating Profile...' : 'Complete Setup'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
