import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const bgColors = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-blue-600',
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold ${bgColors[type]}`}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;
