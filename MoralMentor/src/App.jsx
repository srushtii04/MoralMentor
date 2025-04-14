import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import Navbar from "./components/Navbar";
import ResourcesPage from "./components/ResourcesPage";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import LearningHub from "./components/LearningHub";
import FlipCards from "./components/FlipCards";
import DebateHome from "./components/DebateHome";
import CreateDebate from "./components/CreateDebate";
import JoinDebate from "./components/JoinDebate";
import DebateRoom from "./components/DebateRoom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/flipcards" element={<FlipCards />} />
          <Route path="/hub" element={<LearningHub />} />
          <Route path="/debates" element={<DebateHome />} />
          <Route path="/create-debate" element={<CreateDebate />} />
          <Route path="/join-debate" element={<JoinDebate />} />
          <Route path="/debate-room/:debateId" element={<DebateRoom />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;