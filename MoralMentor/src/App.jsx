import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import QuizPage from "./components/QuizPage";
import DebatePage from "./components/DebatePage"; // Import DebatePage
import Navbar from "./components/Navbar";
import ResourcesPage from "./components/ResourcesPage";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import LearningHub from "./components/LearningHub";
import FlipCards from "./components/FlipCards";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/flipcards" element={<FlipCards/>}/>
        <Route path="/hub" element={<LearningHub/>}/>
        <Route path="/debates" element={<DebatePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
