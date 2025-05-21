import React from 'react';

export const StatCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <span className="p-2 bg-gray-200 rounded-full w-6 h-6"></span>
      </div>
      <div className="flex items-end space-x-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  );
};

export const BestSellingProductSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="flex items-center">
        <div className="p-3 bg-gray-200 rounded-full w-10 h-10 mr-4"></div>
        <div>
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    </div>
  );
};