import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallbackProps } from './GeneralError'; // Importing type from GeneralError.tsx

type ErrorBoundaryProps = {
  fallback: React.ComponentType<ErrorFallbackProps>;
  children: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ fallback: Fallback, children }) => {
  return <ReactErrorBoundary FallbackComponent={Fallback}>{children}</ReactErrorBoundary>;
};

export default ErrorBoundary;
