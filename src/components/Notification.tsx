import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  onClose: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-box">
        <div className="notif-icon-container">
          <AlertTriangle size={32} />
        </div>
        <h2 className="notif-title">Peringatan Kritis!</h2>
        <p className="notif-message">
          Air keruh dengan kadar Ph di bawah 5,5, segera bersihkan akuarium. Jadwal pemberian makan otomatis telah dinonaktifkan untuk keamanan.
        </p>
        <button className="btn-close-notif" onClick={onClose}>
          Saya Mengerti
        </button>
      </div>
    </div>
  );
};
