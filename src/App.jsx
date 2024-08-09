import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Ideas from "./Pages/Ideas";
import Work from "./Pages/Work";
import About from "./Pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Work />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<About />} />
        <Route path="/careers" element={<About />} />
        <Route path="/contact" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
