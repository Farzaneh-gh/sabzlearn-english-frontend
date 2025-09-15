import React from "react";

function ErrorFallback({ onRetry, message }) {
  return (
    <div className="flex flex-col  col-span-full items-center justify-center text-center py-10 mx-auto">
      <p className="text-red-600 font-semibold text-lg mb-3">
        ❌ Failed to load articles
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-5 max-w-md">
        Oops! Something went wrong while fetching the <span>{message}</span>. Please
        check your connection or try again.
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition-colors"
      >
        🔄 Retry
      </button>
    </div>
  );
}

export default ErrorFallback;
