import React, { useState, useEffect } from 'react';
import { Typography, Box, Container } from "@mui/material";
import { Link } from "react-router-dom";
import TrackVisibility from 'react-on-screen';
import { Col } from "react-bootstrap";
import background from './assets/homepage.jpg'

const Text = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Virtual Learning", "Instant Support", "Having Fun" ];
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

  return (
    <Box sx={{
        height: "100vh",
        alignContent: "center",
        display: "flex",
        justifyContent: "space-around",
        backgroundColor: "#5CBD95"
      }}>
        
        <Container sx={{width: "40%", padding: "60px", borderRadius: "30px", marginTop: "10%"}}>
          <Col>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "400" }}>{`Welcome to a new area of`}</h1>
                <h2>
                  <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Virtual Learning", "Instant Support", "Having Fun" ]'>
                    <span className="wrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "500" }}>{text}</span>
                  </span>
                </h2>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "300" }}>A website that boosts classroom interaction</p>
              </div>
              }
            </TrackVisibility>
          </Col>

          <Box sx={{
            display: "flex",
            justifyContent: "space-around",
            margin: "50px",
          }}>
            <Link to="/joinmeeting" style={{ textDecoration: 'none' }}>
              <button class="button-64" role="button"><span class="text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "400" }}>I am a Student</span></button>
            </Link>
          
            <Link to="/createmeeting" style={{ textDecoration: 'none' }}>
              <button class="button-64" role="button"><span class="text" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: "400" }}>I am a Teacher</span></button>
            </Link>
          </Box>


        </Container>

    </Box>
  )
}

export default Text