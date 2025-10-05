import React, { useState } from 'react';
import Modal from './Modal';
import { useApp } from '../context/AppContext';

const BountyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    severity: 'medium',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useApp();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newBounty = {
        id: Date.now(),
        ...formData,
        company: 'Your Company',
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };

      dispatch({
        type: 'ADD_BOUNTY',
        payload: newBounty
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now(),
          type: 'success',
          title: 'Bounty Posted',
          message: 'Your bug bounty has been successfully posted!'
        }
      });

      setIsSubmitting(false);
      onClose();
      setFormData({
        title: '',
        description: '',
        reward: '',
        severity: 'medium',
        deadline: ''
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Post New Bounty">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bounty Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="e.g., Authentication Bypass Vulnerability"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="input-field w-full resize-none"
            placeholder="Describe the type of vulnerabilities you're looking for..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reward Amount
            </label>
            <input
              type="text"
              name="reward"
              value={formData.reward}
              onChange={handleChange}
              required
              className="input-field w-full"
              placeholder="e.g., $5,000"
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
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="input-field w-full"
          />
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
            {isSubmitting ? 'Posting...' : 'Post Bounty'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BountyModal;
