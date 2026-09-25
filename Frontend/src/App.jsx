import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Skills from "./pages/Skills";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import RequestForm from "./pages/RequestForm";
import LearnerDashboard from "./pages/LearnerDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import AddSkill from "./pages/AddSkill";
import Resources from "./pages/Resources";
import Certificate from "./pages/Certificate";
import MentorCertificate from "./pages/MentorCertificate";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route
          path="/mentor-certificate"
          element={<MentorCertificate />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learner-dashboard"
          element={
            <ProtectedRoute role="learner">
              <LearnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
           <ProtectedRoute>
             <Chat />
           </ProtectedRoute>
          }
       />

        {/* Test Route */}
        <Route
          path="/test"
          element={<h1 className="text-red-500 text-5xl">TEST PAGE</h1>}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;