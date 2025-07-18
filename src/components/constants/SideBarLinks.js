// src/components/constants/SideBarLinks.jsx
import {
  HomeIcon,
  UsersIcon,
  LockOpenIcon,
  ChartBarIcon,
  ChatAltIcon,
  BriefcaseIcon,
  CashIcon,
  ClockIcon,
  AcademicCapIcon,
  FolderIcon,
  UserGroupIcon,
  CogIcon,
  ExclamationIcon,
  UserCircleIcon,
  ClipboardListIcon,
  SupportIcon
} from '@heroicons/react/outline';

const SideBarLinks = {
  superadmin: [
    { label: "Dashboard", path: "/superadmin", icon: HomeIcon },
    { label: "Manage Admin", path: "/superadmin/manage", icon: UsersIcon },
    { label: "Bypass Login", path: "/superadmin/bypass", icon: LockOpenIcon },
    { label: "Analysis", path: "/superadmin/analysis", icon: ChartBarIcon },
    { label: "Reviews & Queries", path: "/superadmin/queries", icon: ChatAltIcon, badge: "5" },
  ],
  admin: [
    { label: "Dashboard", path: "/admin", icon: HomeIcon },
    { label: "Manage", path: "/admin/manage", icon: UsersIcon },
    { label: "Bypass", path: "/admin/bypass", icon: LockOpenIcon },
    { label: "Analysis", path: "/admin/analysis", icon: ChartBarIcon },
    { label: "Queries", path: "/admin/queries", icon: ChatAltIcon },
  ],
  hr: [
    { label: "Manage", path: "/hr", icon: BriefcaseIcon },
    { label: "Projects", path: "/hr/projects", icon: FolderIcon },
    { label: "Hiring", path: "/hr/hiring", icon: UserGroupIcon },
    { label: "Payroll", path: "/hr/payroll", icon: CashIcon },
    { label: "Attendance", path: "/hr/attendance", icon: ClockIcon },
    { label: "Training", path: "/hr/training", icon: AcademicCapIcon },
  ],
  projectmanager: [
    { label: "Projects", path: "/projectmanager", icon: FolderIcon },
    { label: "Assign Team", path: "/projectmanager/assign", icon: UserGroupIcon },
    { label: "Project Process", path: "/projectmanager/process", icon: CogIcon },
    { label: "Resources", path: "/projectmanager/resources", icon: BriefcaseIcon },
  ],
  teamlead: [
    { label: "Dashboard", path: "/teamlead", icon: HomeIcon },
    { label: "Assign Team", path: "/teamlead/assign", icon: UserGroupIcon },
    { label: "Resources", path: "/teamlead/resources", icon: BriefcaseIcon },
    { label: "Issues", path: "/teamlead/issues", icon: ExclamationIcon },
  ],
  employee: [
    { label: "Profile", path: "/employee", icon: UserCircleIcon },
    { label: "Attendance", path: "/employee/attendance", icon: ClockIcon },
    { label: "Tasks", path: "/employee/tasks", icon: ClipboardListIcon },
    { label: "Helpdesk", path: "/employee/helpdesk", icon: SupportIcon },
  ],
};

export default SideBarLinks;