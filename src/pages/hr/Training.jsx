import React, { useState } from 'react';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  UserGroupIcon, 
  CalendarIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  BriefcaseIcon,
  BookmarkIcon,
  ChevronDownIcon,
  XCircleIcon
} from '@heroicons/react/outline';

const Training = () => {
  const [activeTab, setActiveTab] = useState('programs');
  const [showNewProgramModal, setShowNewProgramModal] = useState(false);
  const [showAssignTrainingModal, setShowAssignTrainingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Training programs data
  const trainingPrograms = [
    { id: 'TRN001', title: 'React Advanced', category: 'Technical', trainer: 'Sanjay Mehta', date: '15-20 Jun 2023', participants: 12, status: 'Ongoing' },
    { id: 'TRN002', title: 'Leadership Skills', category: 'Soft Skills', trainer: 'Priya Reddy', date: '25-27 Jun 2023', participants: 8, status: 'Upcoming' },
    { id: 'TRN003', title: 'DevOps Fundamentals', category: 'Technical', trainer: 'Arun Kumar', date: '5-7 Jun 2023', participants: 15, status: 'Completed' },
    { id: 'TRN004', title: 'UX Design Principles', category: 'Design', trainer: 'Neha Sharma', date: '10-12 Jul 2023', participants: 10, status: 'Upcoming' },
  ];

  // New employees data
  const newEmployees = [
    { id: 'EMP101', name: 'Rahul Sharma', role: 'Frontend Developer', department: 'Engineering', joinDate: '01 Jun 2023' },
    { id: 'EMP102', name: 'Priya Patel', role: 'UX Designer', department: 'Product', joinDate: '05 Jun 2023' },
    { id: 'EMP103', name: 'Amit Singh', role: 'Backend Developer', department: 'Engineering', joinDate: '10 Jun 2023' },
    { id: 'EMP104', name: 'Neha Gupta', role: 'Marketing Specialist', department: 'Marketing', joinDate: '15 Jun 2023' },
  ];

  // Training history data
  const trainingHistory = [
    { id: 'HIS001', employeeId: 'EMP101', employeeName: 'Rahul Sharma', programId: 'TRN003', programTitle: 'DevOps Fundamentals', completionDate: '07 Jun 2023', status: 'Completed' },
    { id: 'HIS002', employeeId: 'EMP102', employeeName: 'Priya Patel', programId: 'TRN001', programTitle: 'React Advanced', completionDate: '20 Jun 2023', status: 'In Progress' },
    { id: 'HIS003', employeeId: 'EMP101', employeeName: 'Rahul Sharma', programId: 'TRN002', programTitle: 'Leadership Skills', completionDate: '27 Jun 2023', status: 'Registered' },
  ];

  // Form state
  const [newProgramForm, setNewProgramForm] = useState({
    title: '',
    category: '',
    trainer: '',
    startDate: '',
    endDate: ''
  });

  const [assignTrainingForm, setAssignTrainingForm] = useState({
    employeeId: '',
    programId: '',
    assignmentType: 'role' // role, interest, department
  });

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': 
      case 'in progress': return 'bg-blue-100 text-blue-800';
      case 'upcoming': 
      case 'registered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewProgramChange = (e) => {
    const { name, value } = e.target;
    setNewProgramForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAssignTrainingChange = (e) => {
    const { name, value } = e.target;
    setAssignTrainingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNewProgramSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save the new program here
    alert(`New program "${newProgramForm.title}" created successfully!`);
    setShowNewProgramModal(false);
    setNewProgramForm({
      title: '',
      category: '',
      trainer: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleAssignTrainingSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would assign the training here
    alert(`Training assigned successfully!`);
    setShowAssignTrainingModal(false);
    setAssignTrainingForm({
      employeeId: '',
      programId: '',
      assignmentType: 'role'
    });
  };

  const filteredPrograms = trainingPrograms.filter(program =>
    program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    program.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Employee Training & Development</h1>
        <p className="text-gray-600 mt-1">Manage training programs and employee development</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'programs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('programs')}
        >
          Training Programs
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'newEmployees' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('newEmployees')}
        >
          New Employees
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'history' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('history')}
        >
          Training History
        </button>
      </div>

      {activeTab === 'programs' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                  <AcademicCapIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-gray-500">Total Programs</h3>
                  <p className="text-2xl font-bold">{trainingPrograms.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-gray-500">Completed</h3>
                  <p className="text-2xl font-bold">
                    {trainingPrograms.filter(p => p.status === 'Completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-gray-500">Upcoming</h3>
                  <p className="text-2xl font-bold">
                    {trainingPrograms.filter(p => p.status === 'Upcoming').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Training Programs Table */}
          <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search programs..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                onClick={() => setShowNewProgramModal(true)}
              >
                <PlusIcon className="h-5 w-5" />
                Add New Program
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participants</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrograms.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.trainer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{program.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1 text-gray-500" />
                          {program.participants}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(program.status)}`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200"
                          onClick={() => alert(`Viewing details for ${program.title}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                          onClick={() => alert(`Editing ${program.title}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'newEmployees' && (
        <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-lg font-semibold text-gray-800">New Employees (Last 30 Days)</h3>
            <button 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
              onClick={() => setShowAssignTrainingModal(true)}
            >
              <PlusIcon className="h-5 w-5" />
              Assign Training
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        onClick={() => {
                          setAssignTrainingForm(prev => ({ ...prev, employeeId: employee.id }));
                          setShowAssignTrainingModal(true);
                        }}
                      >
                        Assign Training
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow p-6 transform transition-all duration-300 hover:shadow-xl">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Training Assignment History</h3>
            <p className="text-gray-600 mt-1">View all assigned trainings and their status</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">History ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainingHistory.map((history) => (
                  <tr key={history.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{history.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2 text-gray-500" />
                        {history.employeeName} ({history.employeeId})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {history.programTitle} ({history.programId})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.completionDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(history.status)}`}>
                        {history.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Program Modal */}
      {showNewProgramModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300">
            <form onSubmit={handleNewProgramSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">Create New Training Program</h3>
                  <button 
                    type="button"
                    onClick={() => setShowNewProgramModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Title</label>
                    <input
                      type="text"
                      name="title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newProgramForm.title}
                      onChange={handleNewProgramChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        name="category"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newProgramForm.category}
                        onChange={handleNewProgramChange}
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Technical">Technical</option>
                        <option value="Soft Skills">Soft Skills</option>
                        <option value="Design">Design</option>
                        <option value="Management">Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
                      <input
                        type="text"
                        name="trainer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newProgramForm.trainer}
                        onChange={handleNewProgramChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newProgramForm.startDate}
                        onChange={handleNewProgramChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={newProgramForm.endDate}
                        onChange={handleNewProgramChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewProgramModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Program
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Training Modal */}
      {showAssignTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl transform transition-all duration-300">
            <form onSubmit={handleAssignTrainingSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">Assign Training</h3>
                  <button 
                    type="button"
                    onClick={() => setShowAssignTrainingModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                    <div className="flex space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="assignmentType"
                          value="role"
                          checked={assignTrainingForm.assignmentType === 'role'}
                          onChange={handleAssignTrainingChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">By Role</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="assignmentType"
                          value="interest"
                          checked={assignTrainingForm.assignmentType === 'interest'}
                          onChange={handleAssignTrainingChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">By Interest</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="assignmentType"
                          value="department"
                          checked={assignTrainingForm.assignmentType === 'department'}
                          onChange={handleAssignTrainingChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">By Department</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {assignTrainingForm.assignmentType === 'role' ? 'Employee Role' : 
                       assignTrainingForm.assignmentType === 'interest' ? 'Interest Area' : 
                       'Department'}
                    </label>
                    <select
                      name="employeeId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={assignTrainingForm.employeeId}
                      onChange={handleAssignTrainingChange}
                      required
                    >
                      <option value="">Select {assignTrainingForm.assignmentType}</option>
                      {assignTrainingForm.assignmentType === 'role' && (
                        <>
                          <option value="Frontend Developer">Frontend Developer</option>
                          <option value="Backend Developer">Backend Developer</option>
                          <option value="UX Designer">UX Designer</option>
                          <option value="Product Manager">Product Manager</option>
                        </>
                      )}
                      {assignTrainingForm.assignmentType === 'interest' && (
                        <>
                          <option value="Technical">Technical</option>
                          <option value="Design">Design</option>
                          <option value="Management">Management</option>
                          <option value="Leadership">Leadership</option>
                        </>
                      )}
                      {assignTrainingForm.assignmentType === 'department' && (
                        <>
                          <option value="Engineering">Engineering</option>
                          <option value="Product">Product</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Training Program</label>
                    <select
                      name="programId"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={assignTrainingForm.programId}
                      onChange={handleAssignTrainingChange}
                      required
                    >
                      <option value="">Select program</option>
                      {trainingPrograms.map(program => (
                        <option key={program.id} value={program.id}>{program.title} ({program.id})</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAssignTrainingModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Assign Training
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;