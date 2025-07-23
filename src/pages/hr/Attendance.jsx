import React, { useState } from 'react';
import {
  SearchIcon,
  DownloadIcon,
  CheckIcon,
  XIcon,
  PencilIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/outline';

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('attendance');
  const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
  const [newLeave, setNewLeave] = useState({
    empId: '', name: '', type: 'Sick Leave', startDate: '', endDate: '', reason: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editedAttendance, setEditedAttendance] = useState({});

  // Sample data
  const [attendanceData] = useState([
    { id: 'ATT001', empId: 'EMP001', name: 'Rahul Sharma', date: '2023-06-01', checkIn: '09:05', checkOut: '18:15', status: 'Present', notes: 'Worked on project' },
    { id: 'ATT002', empId: 'EMP001', name: 'Rahul Sharma', date: '2023-06-02', checkIn: '09:00', checkOut: '18:00', status: 'Present', notes: 'Client meeting' },
    { id: 'ATT003', empId: 'EMP001', name: 'Rahul Sharma', date: '2023-06-03', checkIn: '10:15', checkOut: '17:30', status: 'Late', notes: 'Traffic delay' },
    { id: 'ATT004', empId: 'EMP002', name: 'Priya Patel', date: '2023-06-01', checkIn: '09:30', checkOut: '17:45', status: 'Present', notes: '' },
    { id: 'ATT005', empId: 'EMP002', name: 'Priya Patel', date: '2023-06-02', checkIn: '-', checkOut: '-', status: 'Absent', notes: 'Sick leave' },
  ]);

  const [leaveRequests] = useState([
    { id: 'LEAVE001', empId: 'EMP001', name: 'Rahul Sharma', type: 'Sick Leave', 
      startDate: '2023-06-15', endDate: '2023-06-16', days: 2, status: 'Approved', reason: 'Fever' }
  ]);

  // Calculate monthly summary
  const monthlySummary = attendanceData.reduce((acc, record) => {
    const month = record.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) acc[month] = {};
    if (!acc[month][record.empId]) {
      acc[month][record.empId] = { name: record.name, present: 0, late: 0, absent: 0 };
    }
    if (record.status === 'Present') acc[month][record.empId].present++;
    else if (record.status === 'Late') acc[month][record.empId].late++;
    else if (record.status === 'Absent') acc[month][record.empId].absent++;
    return acc;
  }, {});

  const getStatusColor = (status) => {
    const colors = {
      present: 'bg-emerald-100 text-emerald-800',
      late: 'bg-amber-100 text-amber-800',
      absent: 'bg-rose-100 text-rose-800',
      approved: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-rose-100 text-rose-800',
      pending: 'bg-amber-100 text-amber-800'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = activeTab === 'attendance' 
    ? attendanceData.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.empId.toLowerCase().includes(searchTerm.toLowerCase()))
    : leaveRequests.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.empId.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEdit = (record) => {
    setEditingId(record.id);
    setEditedAttendance({
      checkIn: record.checkIn,
      checkOut: record.checkOut,
      status: record.status,
      notes: record.notes
    });
  };

  const handleSave = (id) => {
    // In a real app, you would update the state here
    alert(`Attendance record ${id} updated!`);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-white border-b">
          <h1 className="text-2xl font-bold text-gray-900">Employee Attendance System</h1>
          <div className="flex items-center mt-2 space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              <UserIcon className="h-4 w-4 mr-1" /> {attendanceData.length} Employees
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-800">
              <CheckIcon className="h-4 w-4 mr-1" /> {
                attendanceData.filter(a => a.status === 'Present').length
              } Present Today
            </span>
          </div>
        </div>

        {/* Tabs and Search */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-6 py-2 font-medium flex items-center ${activeTab === 'attendance' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <ClockIcon className="h-5 w-5 mr-2" /> Attendance
              </button>
              <button
                onClick={() => setActiveTab('leave')}
                className={`px-6 py-2 font-medium flex items-center ${activeTab === 'leave' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              >
                <CalendarIcon className="h-5 w-5 mr-2" /> Leave
              </button>
            </div>

            <div className="flex space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:w-96">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {activeTab === 'leave' && (
                <button 
                  onClick={() => setShowAddLeaveModal(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <PlusIcon className="h-5 w-5 mr-2" /> New Leave
                </button>
              )}
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <DownloadIcon className="h-5 w-5 mr-2" /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        {activeTab === 'attendance' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In/Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {record.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{record.name}</div>
                          <div className="text-sm text-gray-500">{record.empId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === record.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={editedAttendance.checkIn}
                            onChange={(e) => setEditedAttendance({...editedAttendance, checkIn: e.target.value})}
                            className="border rounded p-1 w-24"
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={editedAttendance.checkOut}
                            onChange={(e) => setEditedAttendance({...editedAttendance, checkOut: e.target.value})}
                            className="border rounded p-1 w-24"
                          />
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">
                          {record.checkIn} to {record.checkOut}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === record.id ? (
                        <select
                          value={editedAttendance.status}
                          onChange={(e) => setEditedAttendance({...editedAttendance, status: e.target.value})}
                          className="border rounded p-1"
                        >
                          <option>Present</option>
                          <option>Late</option>
                          <option>Absent</option>
                        </select>
                      ) : (
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingId === record.id ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleSave(record.id)}
                            className="text-emerald-600 hover:text-emerald-900"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => setEditingId(null)}
                            className="text-rose-600 hover:text-rose-900"
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Leave Table */}
        {activeTab === 'leave' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                          {request.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.name}</div>
                          <div className="text-sm text-gray-500">{request.empId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.startDate} to {request.endDate} ({request.days} days)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {request.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button className="text-emerald-600 hover:text-emerald-900">
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button className="text-rose-600 hover:text-rose-900">
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Monthly Summary */}
        {activeTab === 'attendance' && (
          <div className="p-6 border-t">
            <h2 className="text-lg font-medium mb-4">Monthly Attendance Summary</h2>
            {Object.entries(monthlySummary).map(([month, employees]) => (
              <div key={month} className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3">{new Date(month).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Late</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Days</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(employees).map(([empId, stats]) => (
                        <tr key={`${month}-${empId}`}>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{stats.name}</div>
                            <div className="text-sm text-gray-500">{empId}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{stats.present}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{stats.late}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{stats.absent}</td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stats.present + stats.late + stats.absent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Leave Modal */}
      {showAddLeaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Add Leave Request</h3>
              <button onClick={() => setShowAddLeaveModal(false)}>
                <XIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                  <input
                    value={newLeave.empId}
                    onChange={(e) => setNewLeave({...newLeave, empId: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    value={newLeave.name}
                    onChange={(e) => setNewLeave({...newLeave, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Leave Type</label>
                <select
                  value={newLeave.type}
                  onChange={(e) => setNewLeave({...newLeave, type: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>Sick Leave</option>
                  <option>Personal Leave</option>
                  <option>Vacation</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={newLeave.startDate}
                    onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={newLeave.endDate}
                    onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea
                  value={newLeave.reason}
                  onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                />
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddLeaveModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddLeaveModal(false);
                  alert('Leave request submitted!');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;