
import React from 'react'
const getWindowDimensions = (): {
  width: number,
  height: number
} | undefined => {
  if(typeof window !== 'undefined'){
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
  }
}
const useWindowDimensions = (): {
  width: number,
  height: number
} | undefined => {
  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

  React.useEffect(() => {
    function handleResize():void {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  return windowDimensions;
}

export default useWindowDimensions