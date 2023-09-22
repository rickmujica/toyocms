// /**
//  * * This hook returns the viewport/window height and width
//  */

// import { useEffect, useState } from 'react';

// const useWindowDimensions = () => {
//     const [windowDimensions, setWindowDimensions] = useState({
//         width: undefined,
//         height: undefined,
//     });
//     useEffect(() => {
//         function handleResize() {
//             setWindowDimensions({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         }
//         handleResize();
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []); // Empty array ensures that effect is only run on mount

//     return windowDimensions;
// };

// export default useWindowDimensions;

import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useLayoutEffect(() => {
    handleSize();

    window.addEventListener("resize", handleSize);

    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return windowSize;
};

export default useWindowSize;