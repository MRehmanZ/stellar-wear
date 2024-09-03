import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdprConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gdprConsent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p>
          We use cookies and similar technologies to enhance your experience. By continuing to browse, you agree to our 
          <a href="/privacy-policy" className="underline ml-1">Privacy Policy</a>.
        </p>
        <Button className="mt-2 md:mt-0" onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
};

export default ConsentBanner;
