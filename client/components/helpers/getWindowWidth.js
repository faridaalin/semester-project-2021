import isBrowser from './isBrowser';
const getWindowWidth = () => {
  if (isBrowser()) {
    return window.innerWidth;
  } else {
    return null;
  }
};

export default getWindowWidth;
