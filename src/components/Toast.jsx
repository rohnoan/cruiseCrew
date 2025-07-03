import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-slide-up">
      <div className="bg-black bg-opacity-90 text-white px-6 py-4 rounded-xl shadow-lg backdrop-blur-lg border border-white border-opacity-10 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-400" />
        <p className="font-syne">{message}</p>
      </div>
    </div>
  );
} 