import React from 'react';

const SeverityBadge = ({ severity }) => {
  const getSeverityClass = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'low':
        return 'severity-low';
      default:
        return 'severity-low';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityClass(severity)}`}>
      {severity.toUpperCase()}
    </span>
  );
};

export default SeverityBadge;
