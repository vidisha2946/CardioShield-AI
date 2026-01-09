import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';
import DiagnosticPage from './DiagnosticPage';
import ScrollToTop from './components/ScrollToTop'; // We'll create this helper

import ReportPage from './ReportPage'; // Import the new page

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
