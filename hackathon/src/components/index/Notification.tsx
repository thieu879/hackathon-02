import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'warning' | 'danger';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'alert alert-success';
      case 'warning':
        return 'alert alert-warning';
      case 'danger':
        return 'alert alert-danger';
      default:
        return '';
    }
  };

  return (
    <div className={getAlertClass()} role="alert">
      {message}
    </div>
  );
};

export default Notification;
