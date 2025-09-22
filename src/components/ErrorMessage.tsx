import React from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <div className="error-text">
          <h4 className="error-title">Oops! Something went wrong</h4>
          <p className="error-message">{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="error-dismiss">
            ×
          </button>
        )}
      </div>

      <style>{`
        .error-container {
          margin: 2rem 0;
        }

        .error-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: linear-gradient(135deg, #fee2e2, #fef2f2);
          border: 1px solid #fca5a5;
          border-left: 4px solid #ef4444;
          border-radius: 0.5rem;
          padding: 1rem 1.5rem;
          position: relative;
        }

        .error-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .error-text {
          flex: 1;
        }

        .error-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.1rem;
          font-weight: 600;
          color: #dc2626;
        }

        .error-message {
          margin: 0;
          color: #7f1d1d;
          line-height: 1.5;
        }

        .error-dismiss {
          background: none;
          border: none;
          color: #dc2626;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          line-height: 1;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.25rem;
          transition: background-color 0.2s ease;
        }

        .error-dismiss:hover {
          background: rgba(220, 38, 38, 0.1);
        }

        @media (max-width: 768px) {
          .error-content {
            padding: 1rem;
            gap: 0.75rem;
          }

          .error-title {
            font-size: 1rem;
          }

          .error-message {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};
