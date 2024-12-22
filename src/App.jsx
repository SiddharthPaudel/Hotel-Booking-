import './App.css'
import AboutUs from './components/AboutUs';
import Service from './components/Service';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {


  return (
    <Router>
    <div>
      {/* Navigation */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<Service/>} />
        <Route path="/contact" element={<Service/>} />
        <Route path="/contact" element={<Service/>} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
