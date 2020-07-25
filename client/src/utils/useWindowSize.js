// Import dependecies from react
import React, { useLayoutEffect, useState } from 'react'
// Create a function that allows for responsiveness
function useWindowSize () {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize () {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
// Export the component
export default useWindowSize
