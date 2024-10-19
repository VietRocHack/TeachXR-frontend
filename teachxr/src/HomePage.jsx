import React from 'react'
import Background from './assets/homepage.jpg'
import { Box } from '@material-ui/core';

function Homepage() {
  return (
    // <>
    //   <img 
    //     src={Background} 
    //     alt="Overlay" 
    //     className="w-1024 h-768 object-cover absolute top-0 left-0 opacity-90" 
    //   />
    // </>
    <div 
      className="relative"
      style={{ 
        width: '100vw',    // Fixed width for the container
        height: '100vh',    // Fixed height for the container
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',   // Ensures the image covers the whole container
        backgroundPosition: 'center',  // Centers the image
        backgroundRepeat: 'no-repeat',  // Prevents repeating the image
        margin: '0 auto',   // Centers the container horizontally
        position: 'relative' // Ensures content inside can be positioned absolutely if needed
      }}
    >
      {/* <Button>Start</Button>  */}
    </div>
  );
}

export default Homepage
