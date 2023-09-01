import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
  onTimeout?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  duration = 3000,
  onTimeout,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onTimeout && onTimeout();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onTimeout]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 rounded bg-gray-800 p-4 text-white">
      {message}
    </div>
  );
};
