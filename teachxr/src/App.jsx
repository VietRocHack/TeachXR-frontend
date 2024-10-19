import HomePage from './HomePage'
import Learn from './Learn'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </Router>
  )
}

export default App
