import React, { useState } from 'react';
import { 
  CurrencyRupeeIcon, 
  CalendarIcon, 
  DownloadIcon, 
  SearchIcon,
  PencilIcon,
  CheckIcon,
  XIcon,
  UserIcon
} from '@heroicons/react/outline';

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState('June 2023');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [showSalaryCalculator, setShowSalaryCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState({
    empId: '',
    name: '',
    basicSalary: '',
    presentDays: '',
    monthDays: '30'
  });

  const [payrollData, setPayrollData] = useState([
    { 
      id: 'PAY001', 
      empId: 'EMP001', 
      name: 'Rahul Sharma', 
      basic: 75000, 
      allowances: 15000, 
      deductions: 5000, 
      netPay: 85000, 
      status: 'Paid',
      presentDays: 28,
      totalDays: 30
    },
    { 
      id: 'PAY002', 
      empId: 'EMP002', 
      name: 'Priya Patel', 
      basic: 65000, 
      allowances: 12000, 
      deductions: 4500, 
      netPay: 72500, 
      status: 'Paid',
      presentDays: 26,
      totalDays: 30
    },
    { 
      id: 'PAY003', 
      empId: 'EMP003', 
      name: 'Amit Singh', 
      basic: 55000, 
      allowances: 10000, 
      deductions: 4000, 
      netPay: 61000, 
      status: 'Pending',
      presentDays: 25,
      totalDays: 30
    },
    { 
      id: 'PAY004', 
      empId: 'EMP004', 
      name: 'Neha Gupta', 
      basic: 80000, 
      allowances: 18000, 
      deductions: 6000, 
      netPay: 92000, 
      status: 'Paid',
      presentDays: 29,
      totalDays: 30
    },
    { 
      id: 'PAY005', 
      empId: 'EMP005', 
      name: 'Vikram Joshi', 
      basic: 70000, 
      allowances: 15000, 
      deductions: 5500, 
      netPay: 79500, 
      status: 'Paid',
      presentDays: 27,
      totalDays: 30
    },
  ]);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = payrollData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.empId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    setEditingId(id);
    const employee = payrollData.find(emp => emp.id === id);
    setEditedValues({
      allowances: employee.allowances,
      deductions: employee.deductions
    });
  };

  const handleSave = (id) => {
    setPayrollData(payrollData.map(emp => {
      if (emp.id === id) {
        const newNetPay = emp.basic + editedValues.allowances - editedValues.deductions;
        return {
          ...emp,
          allowances: editedValues.allowances,
          deductions: editedValues.deductions,
          netPay: newNetPay
        };
      }
      return emp;
    }));
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues({
      ...editedValues,
      [name]: parseInt(value) || 0
    });
  };

  const handleCalculatorInputChange = (e) => {
    const { name, value } = e.target;
    setCalculatorInput({
      ...calculatorInput,
      [name]: value
    });
  };

  const calculateSalary = () => {
    const { basicSalary, presentDays, monthDays } = calculatorInput;
    const basic = parseFloat(basicSalary);
    const daysPresent = parseInt(presentDays);
    const totalDays = parseInt(monthDays);

    if (isNaN(basic) || isNaN(daysPresent) || isNaN(totalDays) || totalDays === 0) {
      alert('Please enter valid numbers');
      return;
    }

    if (daysPresent > totalDays) {
      alert('Present days cannot exceed total days in month');
      return;
    }

    const calculatedBasic = (basic * daysPresent / totalDays).toFixed(2);
    const calculatedAllowances = (calculatedBasic * 0.2).toFixed(2); // 20% allowances
    const calculatedDeductions = (calculatedBasic * 0.05).toFixed(2); // 5% deductions
    const netPay = (parseFloat(calculatedBasic) + parseFloat(calculatedAllowances) - parseFloat(calculatedDeductions));

    // Generate sequential IDs
    const nextPayId = payrollData.length + 1;
    const newId = `PAY${nextPayId.toString().padStart(3, '0')}`;
    const newEmpId = calculatorInput.empId || `EMP${nextPayId.toString().padStart(3, '0')}`;
    
    const newEmployee = {
      id: newId,
      empId: newEmpId,
      name: calculatorInput.name || 'New Employee',
      basic: parseFloat(calculatedBasic),
      allowances: parseFloat(calculatedAllowances),
      deductions: parseFloat(calculatedDeductions),
      netPay: netPay,
      status: 'Pending',
      presentDays: daysPresent,
      totalDays: totalDays
    };

    setPayrollData([...payrollData, newEmployee]);
    setShowSalaryCalculator(false);
    setCalculatorInput({
      empId: '',
      name: '',
      basicSalary: '',
      presentDays: '',
      monthDays: '30'
    });
  };

  const processPayroll = () => {
    if (window.confirm('Are you sure you want to process payroll for all pending entries?')) {
      setPayrollData(payrollData.map(emp => ({
        ...emp,
        status: emp.status === 'Pending' ? 'Paid' : emp.status
      })));
    }
  };

  const generatePayslip = (id) => {
    const employee = payrollData.find(emp => emp.id === id);
    alert(`Generating payslip for ${employee.name}\nNet Pay: ₹${employee.netPay.toLocaleString('en-IN')}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payroll Management</h1>
        <p className="text-gray-600">Process and manage employee salaries</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>June 2023</option>
                <option>May 2023</option>
                <option>April 2023</option>
              </select>
              <CalendarIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <div className="absolute right-2 top-2.5 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <button 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => setShowSalaryCalculator(true)}
            >
              <UserIcon className="h-5 w-5" />
              Add Employee
            </button>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
              <DownloadIcon className="h-5 w-5" />
              Export Payslips
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Salary Calculator Modal */}
        {showSalaryCalculator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Salary Calculator</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="empId"
                    value={calculatorInput.empId}
                    onChange={handleCalculatorInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="EMP001"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    name="name"
                    value={calculatorInput.name}
                    onChange={handleCalculatorInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Basic Salary (₹)</label>
                  <input
                    type="number"
                    name="basicSalary"
                    value={calculatorInput.basicSalary}
                    onChange={handleCalculatorInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="75000"
                    min="0"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
                    <input
                      type="number"
                      name="presentDays"
                      value={calculatorInput.presentDays}
                      onChange={handleCalculatorInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="28"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Days in Month</label>
                    <input
                      type="number"
                      name="monthDays"
                      value={calculatorInput.monthDays}
                      onChange={handleCalculatorInputChange}
                      className="w-full p-2 border rounded"
                      placeholder="30"
                      min="1"
                      max="31"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  className="px-4 py-2 border rounded text-gray-700"
                  onClick={() => setShowSalaryCalculator(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={calculateSalary}
                >
                  Calculate & Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allowances</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((payroll) => (
                <tr key={payroll.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payroll.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payroll.name}</div>
                    <div className="text-sm text-gray-500">{payroll.empId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CurrencyRupeeIcon className="h-4 w-4" />
                      {payroll.basic.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingId === payroll.id ? (
                      <input
                        type="number"
                        name="allowances"
                        value={editedValues.allowances}
                        onChange={handleInputChange}
                        className="w-24 p-1 border rounded"
                        min="0"
                      />
                    ) : (
                      <div className="flex items-center">
                        <CurrencyRupeeIcon className="h-4 w-4" />
                        {payroll.allowances.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingId === payroll.id ? (
                      <input
                        type="number"
                        name="deductions"
                        value={editedValues.deductions}
                        onChange={handleInputChange}
                        className="w-24 p-1 border rounded"
                        min="0"
                      />
                    ) : (
                      <div className="flex items-center">
                        <CurrencyRupeeIcon className="h-4 w-4" />
                        {payroll.deductions.toLocaleString('en-IN')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payroll.presentDays}/{payroll.totalDays} days
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${(payroll.presentDays/payroll.totalDays)*100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center">
                      <CurrencyRupeeIcon className="h-4 w-4" />
                      {payroll.netPay.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payroll.status)}`}>
                      {payroll.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      {editingId === payroll.id ? (
                        <>
                          <button 
                            onClick={() => handleSave(payroll.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <CheckIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEdit(payroll.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => generatePayslip(payroll.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Generate Payslip"
                          >
                            <DownloadIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredData.length} of {payrollData.length} employees
          </div>
          <div className="flex space-x-2">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => setShowSalaryCalculator(true)}
            >
              Add New Employee
            </button>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              onClick={processPayroll}
            >
              Process Payroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;