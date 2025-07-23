import React, { useState } from 'react';
import {
  UserGroupIcon,
  CheckCircleIcon,
  CalendarIcon,
  BriefcaseIcon,
  UserIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
  SearchIcon,
  FilterIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  XIcon,
  PlusIcon,
  ClockIcon
} from '@heroicons/react/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [modal, setModal] = useState({ show: false, employee: null });
  const [activeChart, setActiveChart] = useState('department');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ active: true, onLeave: true, newHires: true });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    employee: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'internal',
    description: ''
  });

  const employees = [
    { id: 1, name: 'Mike Torello', joinDate: '07/12/2023', role: 'Front-end Developer', team: 'Design', salary: '$400', performance: 'Good', status: 'Onboarding', email: 'mike@example.com', phone: '+1 (555) 123-4567', address: '123 Main St, Anytown, USA' },
    { id: 2, name: 'Kate Tanner', joinDate: '09/01/2024', role: 'Back-end Developer', team: 'Developer', salary: '$350', performance: 'Very Good', status: 'Active', email: 'kate@example.com', phone: '+1 (555) 987-6543', address: '456 Oak Ave, Somewhere, USA' },
    { id: 3, name: 'Dori Doneau', joinDate: '10/10/2024', role: 'Quality Analytics', team: 'Developer', salary: '$500', performance: 'Good', status: 'On Leave', email: 'dori@example.com', phone: '+1 (555) 456-7890', address: '789 Pine Rd, Nowhere, USA' },
    { id: 4, name: 'Copit. Trunk', joinDate: '12/10/2024', role: 'UI/UX Designer', team: 'Developer', salary: '$500', performance: 'Good', status: 'On Leave', email: 'copit@example.com', phone: '+1 (555) 789-0123', address: '321 Elm Blvd, Anywhere, USA' },
    { id: 5, name: 'Willis Tanner', joinDate: '10/10/2024', role: 'Quality Analytics', team: 'Developer', salary: '$500', performance: 'Good', status: 'On Leave', email: 'willis@example.com', phone: '+1 (555) 234-5678', address: '654 Cedar Ln, Everywhere, USA' },
  ];

  const filteredEmployees = employees.filter(employee =>
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.team.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.active && employee.status === 'Active' ||
     filters.onLeave && employee.status === 'On Leave' ||
     filters.newHires && employee.status === 'Onboarding'))
  );

  const stats = [
    { title: 'Total Employees', value: employees.length, change: '+5%', isPositive: true, icon: UserGroupIcon, color: 'bg-blue-100 text-blue-600', description: 'Total number of active employees' },
    { title: 'Present Today', value: employees.filter(e => e.status === 'Active').length, change: '+3%', isPositive: true, icon: CheckCircleIcon, color: 'bg-green-100 text-green-600', description: 'Employees present at work today' },
    { title: 'On Leave', value: employees.filter(e => e.status === 'On Leave').length, change: '-1%', isPositive: false, icon: CalendarIcon, color: 'bg-yellow-100 text-yellow-600', description: 'Employees currently on leave' },
    { title: 'New Hires', value: employees.filter(e => e.status === 'Onboarding').length, change: '+10%', isPositive: true, icon: BriefcaseIcon, color: 'bg-purple-100 text-purple-600', description: 'Employees hired this month' },
  ];

  const handleAction = (action, data) => {
    switch (action) {
      case 'tab': setActiveTab(data); break;
      case 'filter': setFilters(prev => ({ ...prev, [data]: !prev[data] })); break;
      case 'applyFilters': setShowFilters(false); break;
      case 'view': setModal({ show: true, employee: data }); break;
      case 'close': setModal({ show: false, employee: null }); break;
      case 'chart': setActiveChart(data); break;
      case 'export': {
        const blob = new Blob([JSON.stringify({ employees: filteredEmployees, stats }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createObjectURL(blob);
        link.download = 'hr_dashboard_data.json';
        link.click();
        URL.revokeObjectURL(url);
        break;
      }
      case 'edit': window.location.href = `mailto:${data.email}?subject=Edit%20Employee%20Details&body=Dear%20${data.name},%0A%0AWe%20need%20to%20update%20your%20employee%20details.%20Please%20provide%20the%20necessary%20information.`; break;
      case 'message': window.location.href = `mailto:${data.email}?subject=Message%20from%20HR&body=Dear%20${data.name},%0A%0A`; break;
      case 'schedule': setShowScheduleModal(true); break;
      case 'closeSchedule': setShowScheduleModal(false); setNewMeeting({
        title: '',
        employee: '',
        date: '',
        startTime: '',
        endTime: '',
        type: 'internal',
        description: ''
      }); break;
      default: break;
    }
  };

  const handleMeetingChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting(prev => ({ ...prev, [name]: value }));
  };

  const scheduleMeeting = () => {
    if (!newMeeting.title || !newMeeting.date || !newMeeting.startTime || !newMeeting.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    const formattedMeeting = {
      title: newMeeting.title,
      time: `${newMeeting.startTime} to ${newMeeting.endTime}`,
      day: getDayFromDate(newMeeting.date),
      type: newMeeting.type,
      employee: newMeeting.employee
    };

    setMeetings([...meetings, formattedMeeting]);
    handleAction('closeSchedule');
  };

  const getDayFromDate = (dateString) => {
    const today = new Date();
    const meetingDate = new Date(dateString);
    
    if (meetingDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[meetingDate.getDay()];
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-full ${stat.color} mr-3 shadow-inner`}><Icon className="h-6 w-6" /></div>
          <div className={`flex items-center text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {stat.isPositive ? <ArrowUpIcon className="h-4 w-4 mr-1" /> : <ArrowDownIcon className="h-4 w-4 mr-1" />}{stat.change}
          </div>
        </div>
        <p className="text-gray-500 text-sm font-medium mt-3">{stat.title}</p>
        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
        <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
      </div>
    );
  };

  const TableRow = ({ employee }) => (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{employee.name}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{employee.joinDate}</td>
      <td className="px-4 py-3 text-sm text-gray-500">{employee.role}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          employee.status === 'Active' ? 'bg-green-100 text-green-800' :
          employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
        }`}>{employee.status}</span>
      </td>
      <td className="px-4 py-3 text-sm flex items-center gap-2">
        <button onClick={() => handleAction('view', employee)} className="text-blue-600 hover:text-blue-800 font-medium">View</button>
        <button onClick={() => handleAction('more', employee)} className="text-gray-600 hover:text-gray-800"><DotsVerticalIcon className="h-5 w-5" /></button>
      </td>
    </tr>
  );

  const ChartWrapper = ({ title, data, type = 'Doughnut', options = chartOptions, children }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {type === 'Doughnut' ? (
          <div className="flex border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => handleAction('chart', 'department')} className={`px-3 py-1 text-sm font-medium ${activeChart === 'department' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}>Roles</button>
            <button onClick={() => handleAction('chart', 'performance')} className={`px-3 py-1 text-sm font-medium ${activeChart === 'performance' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-600'}`}>Performance</button>
          </div>
        ) : children}
      </div>
      <div className="h-64">{type === 'Doughnut' ? <Doughnut data={data} options={options} /> : <Bar data={data} options={options} />}</div>
    </div>
  );

  const departmentData = {
    labels: ['Front-end', 'Back-end', 'UI/UX', 'QA', 'Design'],
    datasets: [{ data: [1, 1, 1, 2, 1], backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'], borderWidth: 0, hoverOffset: 20 }],
  };

  const performanceData = {
    labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Needs Improvement'],
    datasets: [{ data: [2, 3, 4, 1, 0], backgroundColor: ['#10B981', '#84CC16', '#F59E0B', '#F97316', '#EF4444'], borderWidth: 0, hoverOffset: 20 }],
  };

  const attendanceData = {
    labels: ['On Time', 'Late', 'Absent'],
    datasets: [{ data: [85, 10, 5], backgroundColor: ['#10B981', '#F59E0B', '#EF4444'], borderWidth: 0, hoverOffset: 20 }],
  };

  const interviewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Interviews', data: [12, 15, 8, 14, 7, 9], backgroundColor: '#3B82F6', borderRadius: 6, hoverBackgroundColor: '#2563EB' }],
  };

  const todaysInterviews = [
    { name: 'Templeton Peck', time: '9:33 PM', role: 'UI/UX Designer' },
    { name: 'Mike Torello', time: '9:33 PM', role: 'Net Intern' },
    { name: 'Jonathan Higgins', time: '9:33 PM', role: 'Graphic Designer' },
  ];

  const [meetings, setMeetings] = useState([
    { title: 'Meeting with the manager', time: '03:00 AM to 03:00 PM', day: 'Today', type: 'internal' },
    { title: 'Meeting with the Director', time: '05:00 PM to 07:00 PM', day: 'Wed', type: 'internal' },
    { title: 'Interview strategy', time: '03:00 AM to 3:00 PM', day: 'Mon', type: 'strategy' },
    { title: 'Discuss about new company policies', time: '05:00 PM to 07:00 PM', day: 'Wed', type: 'policy' },
  ]);

  const leaveEmployee = { name: 'Angus MosGyver', period: '20th Apr - 24th Apr, 2024', reason: 'Public Holiday' };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { boxWidth: 20, padding: 15, font: { size: 14 } } },
      tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.8)', titleFont: { size: 14 }, bodyFont: { size: 12 }, padding: 10, cornerRadius: 6 },
    },
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans transition-all duration-300">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">HR Dashboard</h1>
          <p className="text-gray-600 text-sm">Comprehensive overview of human resources</p>
        </div>
        <div className="relative">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-all duration-200">
            <FilterIcon className="h-5 w-5 text-gray-500" /> Filters <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </button>
          {showFilters && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl p-3 border border-gray-200 animate-fade-in">
              {['active', 'onLeave', 'newHires'].map(filter => (
                <label key={filter} className="flex items-center px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <input type="checkbox" className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked={filters[filter]} onChange={() => handleAction('filter', filter)} />
                  {filter === 'active' ? 'Active Employees' : filter === 'onLeave' ? 'On Leave' : 'New Hires'}
                </label>
              ))}
              <button onClick={() => handleAction('applyFilters')} className="w-full text-left px-3 py-1.5 text-sm text-blue-600 hover:bg-gray-50 rounded-lg font-medium">Apply Filters</button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {['weekly', 'monthly', 'yearly'].map(tab => (
          <button key={tab} onClick={() => handleAction('tab', tab)} className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => <StatCard key={index} stat={stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Employee Status</h2>
              <div className="relative">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 bg-gray-50"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Name', 'Joining Date', 'Role', 'Status', 'Actions'].map(head => (
                      <th key={head} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEmployees.map(employee => <TableRow key={employee.id} employee={employee} />)}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ChartWrapper title={activeChart === 'department' ? 'Roles Distribution' : 'Performance Metrics'} data={activeChart === 'department' ? departmentData : performanceData} />
            <ChartWrapper title="Attendance" data={attendanceData} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Today's Interviews</h2>
              <button onClick={() => handleAction('viewAllInterviews')} className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-3">
              {todaysInterviews.map((interview, index) => (
                <div key={index} className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3"><UserIcon className="h-4 w-4" /></div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{interview.name}</h4>
                    <p className="text-xs text-gray-600">{interview.role}</p>
                    <p className="text-xs text-gray-400">{interview.time}</p>
                  </div>
                  <button onClick={() => handleAction('interview_details', interview)} className="text-gray-400 hover:text-gray-600"><DotsVerticalIcon className="h-5 w-5" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
              <button 
                onClick={() => handleAction('schedule')} 
                className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> Schedule
              </button>
            </div>
            <div className="space-y-3">
              {meetings.map((meeting, index) => (
                <div key={index} className={`border-l-4 pl-3 py-2 hover:bg-gray-50 rounded-r-lg transition-colors duration-150 ${
                  meeting.type === 'internal' ? 'border-blue-500' : meeting.type === 'strategy' ? 'border-purple-500' : 'border-green-500'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">{meeting.title}</h4>
                      {meeting.employee && <p className="text-xs text-gray-600">With: {meeting.employee}</p>}
                      <p className="text-xs text-gray-600">{meeting.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${meeting.day === 'Today' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{meeting.day}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Employee on Leave</h2>
              <button onClick={() => handleAction('viewAllLeaves')} className="text-blue-600 text-sm font-medium hover:text-blue-800">View All</button>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3"><UserIcon className="h-4 w-4" /></div>
                <div>
                  <div className="text-sm font-medium text-gray-800">{leaveEmployee.name}</div>
                  <div className="text-xs text-gray-600">{leaveEmployee.period}</div>
                  <div className="text-xs text-gray-500">{leaveEmployee.reason}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Interviews Overview</h2>
          <button onClick={() => handleAction('export')} className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium">Export</button>
        </div>
        <div className="h-64">
          <Bar 
            data={interviewsData} 
            options={{
              ...chartOptions,
              scales: { 
                y: { 
                  beginAtZero: true, 
                  title: { 
                    display: true, 
                    text: 'Number of Interviews', 
                    font: { size: 14 } 
                  } 
                }, 
                x: { 
                  title: { 
                    display: true, 
                    text: 'Month', 
                    font: { size: 14 } 
                  } 
                }
              },
              plugins: { 
                ...chartOptions.plugins, 
                legend: { display: false } 
              }
            }} 
          />
        </div>
      </div>

      {modal.show && modal.employee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{modal.employee.name}</h2>
                <p className="text-gray-600 text-sm">{modal.employee.role}</p>
              </div>
              <button onClick={() => handleAction('close')} className="text-gray-400 hover:text-gray-600"><XIcon className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Basic Information</h3>
                <p className="text-xs"><span className="text-gray-500">Status:</span> <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  modal.employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                  modal.employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                }`}>{modal.employee.status}</span></p>
                <p className="text-xs"><span className="text-gray-500">Team:</span> {modal.employee.team}</p>
                <p className="text-xs"><span className="text-gray-500">Join Date:</span> {modal.employee.joinDate}</p>
                <p className="text-xs"><span className="text-gray-500">Salary:</span> {modal.employee.salary}</p>
                <p className="text-xs"><span className="text-gray-500">Performance:</span> {modal.employee.performance}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h3>
                <p className="text-xs"><span className="text-gray-500">Email:</span> {modal.employee.email}</p>
                <p className="text-xs"><span className="text-gray-500">Phone:</span> {modal.employee.phone}</p>
                <p className="text-xs"><span className="text-gray-500">Address:</span> {modal.employee.address}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
              <button onClick={() => handleAction('edit', modal.employee)} className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm font-medium">Edit</button>
              <button onClick={() => handleAction('message', modal.employee)} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Send Message</button>
            </div>
          </div>
        </div>
      )}

      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Schedule New Meeting</h2>
              <button onClick={() => handleAction('closeSchedule')} className="text-gray-400 hover:text-gray-600"><XIcon className="h-5 w-5" /></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  name="title"
                  value={newMeeting.title}
                  onChange={handleMeetingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">With Employee (Optional)</label>
                <select
                  name="employee"
                  value={newMeeting.employee}
                  onChange={handleMeetingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.id} value={employee.name}>{employee.name} ({employee.role})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={newMeeting.date}
                    onChange={handleMeetingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                  <select
                    name="type"
                    value={newMeeting.type}
                    onChange={handleMeetingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="internal">Internal</option>
                    <option value="strategy">Strategy</option>
                    <option value="policy">Policy</option>
                    <option value="one-on-one">One-on-One</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newMeeting.startTime}
                    onChange={handleMeetingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newMeeting.endTime}
                    onChange={handleMeetingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  name="description"
                  value={newMeeting.description}
                  onChange={handleMeetingChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting description"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200">
              <button 
                onClick={() => handleAction('closeSchedule')} 
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={scheduleMeeting} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
              >
                <ClockIcon className="h-5 w-5" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;