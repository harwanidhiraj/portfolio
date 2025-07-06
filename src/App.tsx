import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { ROUTES } from "./enums/routes";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./pages/admin/Dashboard";
import ProfileManager from "./pages/admin/ProfileManager";
import SkillsManager from "./pages/admin/SkillsManager";
import ExperienceManager from "./pages/admin/ExperienceManager";
import ProjectsManager from "./pages/admin/ProjectsManager";
import AboutManager from "./pages/admin/AboutManager";
import Messages from "./pages/admin/Messages";
import GetInTouch from "./pages/admin/GetInTouch";
const App = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<ProfileManager />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="experience" element={<ExperienceManager />} />
        <Route path="projects" element={<ProjectsManager />} />
        <Route path="messages" element={<Messages />} />
        <Route path="about" element={<AboutManager />} />
        <Route path="getInTouch" element={<GetInTouch />} />

        <Route path="*" element={<Navigate to="/admin/login" replace />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.PROJECTS} element={<Projects />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
