import React from 'react';
import { useToast } from '../context/ToastContext.jsx';
import { Icon } from './Icon.jsx';
import './ToastRegion.css';

export function ToastRegion() {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="toast-region"
      role="region"
      aria-live="polite"
      aria-label="Notification alerts"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type}`}>
          <div className="toast-content">
            <Icon name="Sparkles" size={18} className="toast-icon" />
            <span className="toast-message">{toast.message}</span>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => dismissToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
