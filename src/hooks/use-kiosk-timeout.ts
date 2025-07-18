import { useEffect, useRef } from 'react';

interface UseKioskTimeoutProps {
  timeoutMs?: number;
  onTimeout: () => void;
  isActive?: boolean;
}

export function useKioskTimeout({ 
  timeoutMs = 60000, // 1 minute default
  onTimeout, 
  isActive = true 
}: UseKioskTimeoutProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (isActive) {
      timeoutRef.current = setTimeout(onTimeout, timeoutMs);
    }
  };

  useEffect(() => {
    if (!isActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    // Set initial timeout
    resetTimeout();

    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, resetTimeout, true);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout, true);
      });
    };
  }, [timeoutMs, onTimeout, isActive]);

  return { resetTimeout };
}