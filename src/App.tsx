import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Auth pages
import LandingPage from "@/pages/LandingPage";
import ReporterLogin from "@/pages/auth/ReporterLogin";
import ManagerLogin from "@/pages/auth/ManagerLogin";
import DeveloperLogin from "@/pages/auth/DeveloperLogin";
import ReporterSignup from "@/pages/auth/ReporterSignup";
import ManagerSignup from "@/pages/auth/ManagerSignup";

// Manager pages
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ManagerProjects from "@/pages/manager/ManagerProjects";
import ManagerIssues from "@/pages/manager/ManagerIssues";
import ManagerKanban from "@/pages/manager/ManagerKanban";
import ManagerDevelopers from "@/pages/manager/ManagerDevelopers";
import ManagerFeedback from "@/pages/manager/ManagerFeedback";

// Developer pages
import DeveloperDashboard from "@/pages/developer/DeveloperDashboard";
import DeveloperIssues from "@/pages/developer/DeveloperIssues";
import DeveloperKanban from "@/pages/developer/DeveloperKanban";

// Reporter pages
import ReporterDashboard from "@/pages/reporter/ReporterDashboard";
import CreateComplaint from "@/pages/reporter/CreateComplaint";
import MyComplaints from "@/pages/reporter/MyComplaints";
import ReporterFeedback from "@/pages/reporter/ReporterFeedback";

// Shared
import ProfilePage from "@/pages/shared/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/reporter-login" element={<ReporterLogin />} />
            <Route path="/manager-login" element={<ManagerLogin />} />
            <Route path="/developer-login" element={<DeveloperLogin />} />
            <Route path="/reporter-signup" element={<ReporterSignup />} />
            <Route path="/manager-signup" element={<ManagerSignup />} />

            {/* Manager */}
            <Route element={<DashboardLayout requiredRole="MANAGER" />}>
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/projects" element={<ManagerProjects />} />
              <Route path="/manager/issues" element={<ManagerIssues />} />
              <Route path="/manager/kanban" element={<ManagerKanban />} />
              <Route path="/manager/developers" element={<ManagerDevelopers />} />
              <Route path="/manager/feedback" element={<ManagerFeedback />} />
              <Route path="/manager/profile" element={<ProfilePage />} />
            </Route>

            {/* Developer */}
            <Route element={<DashboardLayout requiredRole="DEVELOPER" />}>
              <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
              <Route path="/developer/issues" element={<DeveloperIssues />} />
              <Route path="/developer/kanban" element={<DeveloperKanban />} />
              <Route path="/developer/profile" element={<ProfilePage />} />
            </Route>

            {/* Reporter */}
            <Route element={<DashboardLayout requiredRole="REPORTER" />}>
              <Route path="/reporter/dashboard" element={<ReporterDashboard />} />
              <Route path="/reporter/create" element={<CreateComplaint />} />
              <Route path="/reporter/complaints" element={<MyComplaints />} />
              <Route path="/reporter/feedback" element={<ReporterFeedback />} />
              <Route path="/reporter/profile" element={<ProfilePage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
