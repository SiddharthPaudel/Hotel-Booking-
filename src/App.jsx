import './App.css'
import AboutUs from './components/AboutUs';
import Service from './components/Service';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';

import SignUp from './pages/SignUp';
import Card from './components/Card';

function App() {


  return (
    <Router>
    <div>
    

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Card/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/service" element={<Service/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
