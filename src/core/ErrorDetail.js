import React from 'react';

const getMessage = error => (error.issues
  ? error.issues.map(issue => `${issue.severity},${issue.description}`).join('\n')
  : error.message || 'Service unavailable'
);

export const ErrorDetail = error => (<div>Error {getMessage(error)}</div>);