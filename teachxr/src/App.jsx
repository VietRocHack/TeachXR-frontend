import ChatBot from './components/ChatBot';
import HomePage from './HomePage'
import Learn from './Learn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/chatbot" element={<ChatBot />}/>
      </Routes>
    </Router>
  )
}

export default App
