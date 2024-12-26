import './App.css';
import AboutUs from './components/AboutUs';
import Service from './components/Service';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Card from './components/Card';
import Header from './components/Header'; // Assuming you already have this
import Footer from './components/Footer'; // Assuming you already have this
import './index.css'

function App() {
  return (
    <Router>
      <div>
        {/* Header appears on all pages */}
        <Header />

        {/* Main content */}
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<Card />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/service" element={<Service />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>

        {/* Footer appears on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
