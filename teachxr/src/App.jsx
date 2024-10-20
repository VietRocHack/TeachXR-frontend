import HomePage from './HomePage'
import Learn from './Learn'
import SocketTestScreen from './SocketTestScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/socket" element={<SocketTestScreen />} />
      </Routes>
    </Router>
  )
}

export default App
