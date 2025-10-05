import React, { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';

const BugReportModal = ({ isOpen, onClose, bounties }) => {
  const [formData, setFormData] = useState({
    bountyId: '',
    title: '',
    description: '',
    severity: 'medium',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useApp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      attachments: [...formData.attachments, ...files.map(f => f.name)]
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
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const selectedBounty = bounties.find(b => b.id === parseInt(formData.bountyId));
      const newReport = {
        id: Date.now(),
        ...formData,
        bountyId: parseInt(formData.bountyId),
        bountyTitle: selectedBounty?.title || 'Unknown Bounty',
        status: 'pending',
        submittedAt: new Date().toISOString().split('T')[0]
      };

      dispatch({
        type: 'ADD_BUG_REPORT',
        payload: newReport
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          title: 'Report Submitted',
          message: 'Your bug report has been successfully submitted!'
        }
      });

      setIsSubmitting(false);
      onClose();
      setFormData({
        bountyId: '',
        title: '',
        description: '',
        severity: 'medium',
        attachments: []
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Bug Report">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Bounty
          </label>
          <select
            name="bountyId"
            value={formData.bountyId}
            onChange={handleChange}
            required
            className="input-field w-full"
          >
            <option value="">Choose a bounty...</option>
            {bounties.map((bounty) => (
              <option key={bounty.id} value={bounty.id}>
                {bounty.title} - {bounty.reward}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Report Title
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
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Detailed Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            className="input-field w-full resize-none"
            placeholder="Provide detailed steps to reproduce the vulnerability, potential impact, and any additional context..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Severity Level
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            className="input-field w-full"
          >
            <option value="low">Low - Minor issues with limited impact</option>
            <option value="medium">Medium - Moderate impact on security</option>
            <option value="high">High - Significant security risk</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Attachments (Optional)
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="input-field w-full"
            accept=".png,.jpg,.jpeg,.gif,.pdf,.txt,.doc,.docx"
          />
          {formData.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-300 mb-2">Selected files:</p>
              <div className="space-y-1">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-dark-bg rounded px-3 py-2">
                    <span className="text-sm text-gray-300">{file}</span>
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
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BugReportModal;
