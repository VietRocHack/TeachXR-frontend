import { useState, useEffect } from 'react'
import Background from './assets/homepage.jpg'
// import { Box } from '@material-ui/core'
import { Col, Container } from "react-bootstrap"
import TrackVisibility from 'react-on-screen'

import { useNavigate } from 'react-router-dom'

function Homepage() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Touch", "Sound", "Vision", "Senses" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const navigate = useNavigate()
  return (
    <div 
      className="flex justify-center min-h-screen"
      style={{ 
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',   
        backgroundPosition: 'center 75%',  
        backgroundRepeat: 'no-repeat',  
        position: 'relative', 
        opacity: 0.8
      }}
    >

        <button 
          onClick={() => navigate('/learn')}
          className="w-[211px] h-[56px] py-3 px-4 text-lg font-bold bg-black text-white rounded-full border border-gray-100 shadow-xl duration-300 ease-in-out"
          style={{
            position: 'absolute',
            right: '150px',   
            bottom: '80px',  
          }}
        >
          Start Learning
        </button>
    
        <div className="container mx-auto mt-16 text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            TeachXR
          </h1>
          <div className="flex items-center justify-center">
            <h2 className="text-lg font-light mr-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Power learning by
            </h2>
            <h3 className="text-3xl font-extrabold text-purple-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {text}
            </h3>
          </div>
        </div>
    </div>
  );
}

export default Homepage
