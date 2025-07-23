import React, { useState } from 'react';
import {
  UserIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  FilterIcon,
  XIcon,
  ChevronDownIcon,
  CheckIcon
} from '@heroicons/react/outline';

const ManageEmployee = () => {
  // Sample employee data with restricted roles
  const [employees, setEmployees] = useState([
    { id: 'EMP001', name: 'Rahul Sharma', department: 'Engineering', position: 'Senior Developer', joinDate: '15/01/2020', status: 'Active', role: 'employee' },
    { id: 'EMP002', name: 'Priya Patel', department: 'HR', position: 'HR Associate', joinDate: '22/05/2019', status: 'Active', role: 'employee' },
    { id: 'EMP003', name: 'Amit Singh', department: 'Sales', position: 'Sales Executive', joinDate: '10/11/2021', status: 'Active', role: 'employee' },
    { id: 'EMP004', name: 'Neha Gupta', department: 'Marketing', position: 'Marketing Coordinator', joinDate: '05/03/2018', status: 'Active', role: 'employee' },
    { id: 'EMP005', name: 'Vikram Joshi', department: 'Operations', position: 'Operations Assistant', joinDate: '18/07/2020', status: 'Active', role: 'employee' },
  ]);

  // Restricted roles that HR cannot manage
  const restrictedRoles = ['admin', 'pm', 'lead', 'hr'];

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({ 
    name: '', 
    department: '', 
    position: '', 
    joinDate: '', 
    status: 'Active',
    role: 'employee' // Default role is always 'employee'
  });

  // Get unique departments for filter
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = `${emp.id} ${emp.name} ${emp.department}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus && emp.role === 'employee';
  });

  const handleDelete = (id) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee && restrictedRoles.includes(employee.role)) {
      alert('You cannot delete this employee as they have a restricted role');
      return;
    }
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const handleEdit = (employee) => {
    if (restrictedRoles.includes(employee.role)) {
      alert('You cannot edit this employee as they have a restricted role');
      return;
    }
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      department: employee.department,
      position: employee.position,
      joinDate: employee.joinDate,
      status: employee.status,
      role: employee.role
    });
    setShowAddModal(true);
  };

  const handleAddEmployee = () => {
    if (editingEmployee) {
      // Update existing employee
      setEmployees(employees.map(emp => 
        emp.id === editingEmployee.id ? { ...emp, ...newEmployee } : emp
      ));
      setEditingEmployee(null);
    } else {
      // Add new employee
      const newId = `EMP${(employees.length + 1).toString().padStart(3, '0')}`;
      setEmployees((prev) => [...prev, { id: newId, ...newEmployee }]);
    }
    setNewEmployee({ name: '', department: '', position: '', joinDate: '', status: 'Active', role: 'employee' });
    setShowAddModal(false);
  };

  const resetFilters = () => {
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
     
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees by name, ID or department..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition"
              >
                <FilterIcon className="h-5 w-5" />
                Filters
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4 border border-gray-200">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="all">All Departments</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    >
                      <option value="all">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setEditingEmployee(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <PlusIcon className="h-5 w-5" />
              Add Employee
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Employee ID', 'Name', 'Department', 'Position', 'Join Date', 'Status', 'Actions'].map((heading) => (
                  <th key={heading} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(employee)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(employee.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => {
                setShowAddModal(false);
                setEditingEmployee(null);
              }} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Employee name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Employee position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                <input
                  type="date"
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee({ ...newEmployee, joinDate: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.status}
                  onChange={(e) => setNewEmployee({ ...newEmployee, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={handleAddEmployee}
                disabled={!newEmployee.name || !newEmployee.department || !newEmployee.position || !newEmployee.joinDate}
                className={`w-full text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                  !newEmployee.name || !newEmployee.department || !newEmployee.position || !newEmployee.joinDate 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <CheckIcon className="h-5 w-5" />
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEmployee;