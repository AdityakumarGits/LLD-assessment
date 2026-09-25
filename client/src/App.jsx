import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import Practice from "./pages/Practice";
import Feedback from "./pages/Feedback";
import History from "./pages/History";

function App() {
  return (
    <div className="min-h-screen bg-[#f7faf7]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
        <Route path="/attempt/new/:problemId" element={<Practice />} />
        <Route path="/feedback/:attemptId" element={<Feedback />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
