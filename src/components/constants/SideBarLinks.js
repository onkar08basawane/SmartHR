// Superadmin Icons
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

// Admin Icons
// (Already imported above – reuse: FaHome, FaUsers, FaLock, FaChartBar, FaComments, FaSignOutAlt)

// HR Icons
import { FaBriefcase } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";

// Project Manager Icons
// (Reuse: FaFolder, FaUserFriends, FaBriefcase, FaCogs, FaSignOutAlt)
import { FaCogs } from "react-icons/fa";

// Team Lead Icons
// (Reuse: FaHome, FaUserFriends, FaBriefcase, FaSignOutAlt)
import { FaExclamationTriangle } from "react-icons/fa";

// Employee Icons
import { FaUserCircle } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";

// Now define the sidebar links
const SideBarLinks = {
  superadmin: [
    { label: "Dashboard", path: "/superadmin", icon: FaHome },
    { label: "Manage Admin", path: "/superadmin/manage", icon: FaUsers },
    { label: "Bypass Login", path: "/superadmin/bypass", icon: FaLock },
    { label: "Analysis", path: "/superadmin/analysis", icon: FaChartBar },
    { label: "Reviews & Queries", path: "/superadmin/queries", icon: FaComments },
    { label: "Customize", path: "/superadmin/customize", icon: FaWrench },
    { label: "Roles & Permissions", path: "/superadmin/roles", icon: FaUserShield },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: FaHome },
    { label: "Manage", path: "/admin/manage", icon: FaUsers },
    { label: "Bypass", path: "/admin/bypass", icon: FaLock },
    { label: "Analysis", path: "/admin/analysis", icon: FaChartBar },
    { label: "Queries", path: "/admin/queries", icon: FaComments },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
  hr: [
    { label: "Dashboard", path: "/hr", icon: FaHome },
    { label: "Manage", path: "/hr/manage", icon: FaBriefcase },
    { label: "Projects", path: "/hr/projects", icon: FaFolder },
    { label: "Hiring", path: "/hr/hiring", icon: FaUserFriends },
    { label: "Payroll", path: "/hr/payroll", icon: FaMoneyBillWave },
    { label: "Attendance", path: "/hr/attendance", icon: FaClock },
    { label: "Training", path: "/hr/training", icon: FaGraduationCap },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
  projectmanager: [
    { label: "Projects", path: "/projectmanager", icon: FaFolder },
    { label: "Assign Team", path: "/projectmanager/assign", icon: FaUserFriends },
    { label: "Project Process", path: "/projectmanager/process", icon: FaCogs },
    { label: "Resources", path: "/projectmanager/resources", icon: FaBriefcase },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
  teamlead: [
    { label: "Dashboard", path: "/teamlead", icon: FaHome },
    { label: "Assign Team", path: "/teamlead/assign", icon: FaUserFriends },
    { label: "Resources", path: "/teamlead/resources", icon: FaBriefcase },
    { label: "Issues", path: "/teamlead/issues", icon: FaExclamationTriangle },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
  employee: [
    { label: "Profile", path: "/employee", icon: FaUserCircle },
    { label: "Attendance", path: "/employee/attendance", icon: FaClock },
    { label: "Tasks", path: "/employee/tasks", icon: FaClipboardList },
    { label: "Helpdesk", path: "/employee/helpdesk", icon: FaHeadset },
    { label: "Logout", path: "/logout", icon: FaSignOutAlt },
  ],
};

export default SideBarLinks;
