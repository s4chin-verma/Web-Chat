import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  return windowWidth;
};
