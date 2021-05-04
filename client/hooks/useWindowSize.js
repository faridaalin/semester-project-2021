import { useState, useEffect } from 'react';
import getWindowWidth from '../helpers/getWindowWidth';

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth());
  const [resized, seResized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowWidth());
      seResized(true);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWidth]);
  return [width, resized];
};

export default useWindowWidth;
