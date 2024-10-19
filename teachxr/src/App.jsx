import HomePage from './HomePage'
import Learn from './Learn'
import Text from './Text'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/text" element={<Text />} />
      </Routes>
    </Router>
  )
}

export default App
