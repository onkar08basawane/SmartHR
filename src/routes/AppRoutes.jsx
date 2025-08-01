// src/routes/AppRoutes.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Layouts
import PublicLayout from "../components/layout/PublicLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Public Landing Page
import Home from "../pages/public/Home";

// Auth
import Login from "../pages/auth/Login";

// Super Admin
import Dashboard from "../pages/superadmin/Dashboard";
import ManageAdmin from "../pages/superadmin/ManageAdmin";
import Bypass from "../pages/superadmin/Bypass";
import Analysis from "../pages/superadmin/Analysis";
import Queries from "../pages/superadmin/Queries";
import Customize from "../pages/superadmin/Customize";
import Roles from "../pages/superadmin/Roles"; // <- don't forget this import

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import Manage from "../pages/admin/Manage";
import AdminBypass from "../pages/admin/AdminBypass";
import AdminAnalysis from "../pages/admin/AdminAnalysis";
import AdminQueries from "../pages/admin/AdminQueries";

// HR
import HrDashboard from "../pages/hr/HrDashboard";
import ManageEmployee from "../pages/hr/ManageEmployee";
import TrackProjects from "../pages/hr/TrackProjects";
import Hiring from "../pages/hr/Hiring";
import Payroll from "../pages/hr/Payroll";
import Attendance from "../pages/hr/Attendance";
import Training from "../pages/hr/Training";

// Project Manager
import ManageProject from "../pages/projectmanager/ManageProject";
import Assign from "../pages/projectmanager/Assign";
import ProjectProcess from "../pages/projectmanager/ProjectProcess";
import Resource from "../pages/projectmanager/Resource";

// Team Lead
import TeamDashboard from "../pages/teamlead/TeamDashboard";
import AssignTeam from "../pages/teamlead/AssignTeam";
import Resources from "../pages/teamlead/EmployeeResource";
import Issues from "../pages/teamlead/EmployeeIssues";

// Employee
import Profile from "../pages/employee/PersonalDetails";
import EmpAttendance from "../pages/employee/EmpAttendance";
import Tasks from "../pages/employee/AssignTasks";
import Helpdesk from "../pages/employee/Helpdesk";
import AboutUs from "../components/home/AboutUs";

const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      {/* Public Landing Route */}
      <Route element={<PublicLayout />}>
      <Route path ="/" element={<Home />} />
      </Route>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Super Admin Routes */}
      <Route path="/superadmin" element={<DashboardLayout role="superadmin" />}>
        <Route index element={<Dashboard />} />
        <Route path="manage" element={<ManageAdmin />} />
        <Route path="bypass" element={<Bypass />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="queries" element={<Queries />} />
        <Route path="customize" element={<Customize />} />
        <Route path="roles" element={<Roles />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="manage" element={<Manage />} />
        <Route path="bypass" element={<AdminBypass />} />
        <Route path="analysis" element={<AdminAnalysis />} />
        <Route path="queries" element={<AdminQueries />} />
      </Route>

      {/* HR Routes */}
      <Route path="/hr" element={<DashboardLayout role="hr" />}>
        <Route index element={<HrDashboard />} />
         <Route path="manage" element={<ManageEmployee />} />
        <Route path="projects" element={<TrackProjects />} />
        <Route path="hiring" element={<Hiring />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="training" element={<Training />} />
      </Route>

      {/* Project Manager */}
      <Route path="/projectmanager" element={<DashboardLayout role="projectmanager" />}>
        <Route index element={<ManageProject />} />
        <Route path="assign" element={<Assign />} />
        <Route path="process" element={<ProjectProcess />} />
        <Route path="resources" element={<Resource />} />
      </Route>

      {/* Team Lead */}
      <Route path="/teamlead" element={<DashboardLayout role="teamlead" />}>
        <Route index element={<TeamDashboard />} />
        <Route path="assign" element={<AssignTeam />} />
        <Route path="resources" element={<Resources />} />
        <Route path="issues" element={<Issues />} />
      </Route>

      {/* Employee */}
      <Route path="/employee" element={<DashboardLayout role="employee" />}>
        <Route index element={<Profile />} />
        <Route path="attendance" element={<EmpAttendance />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="helpdesk" element={<Helpdesk />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
