import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import QuizPage from "./components/QuizPage";
import Navbar from "./components/Navbar";
import About from "./components/About";
import LearningHub from "./components/LearningHub";
import FlipCards from "./components/FlipCards";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About/>}/>
        <Route path="/flipcards" element={<FlipCards/>}/>
        <Route path="/hub" element={<LearningHub/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
