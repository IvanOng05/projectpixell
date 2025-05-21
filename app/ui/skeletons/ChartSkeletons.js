import React from 'react';

export const ChartSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );
};