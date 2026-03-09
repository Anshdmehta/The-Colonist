import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Agreement from "./pages/Agreement";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agreement" element={<Agreement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
