import React from 'react';

export type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

const GeneralError: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div>
      <p>Oops! An unexpected error occurred:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default GeneralError;
