import React from 'react';

const SecendLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-100 w-full">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Inner Pulse Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default SecendLoader;