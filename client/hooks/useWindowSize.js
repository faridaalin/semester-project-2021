import { useState, useEffect } from 'react';
import getWindowWidth from '../helpers/getWindowWidth';

const useWindowWidth = () => {
  const [width, setWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getWindowWidth());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWidth]);
  return width;
};

export default useWindowWidth;
