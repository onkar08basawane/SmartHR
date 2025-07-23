import React, { useState } from 'react';
import {
  BriefcaseIcon, UserAddIcon, ClockIcon, CheckCircleIcon, XCircleIcon,
  SearchIcon, ChartBarIcon, UserGroupIcon, ExclamationIcon, PlusIcon,
  ArrowSmRightIcon, UserIcon, CalendarIcon, DocumentTextIcon, StarIcon
} from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('candidates');
  const [showHiringFlow, setShowHiringFlow] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [hiringForm, setHiringForm] = useState({
    position: '', department: '', hiringType: '', jobDescription: ''
  });

  const [candidates, setCandidates] = useState([
    {
      id: 'CAN001', 
      name: 'Arjun Reddy', 
      position: 'Frontend Developer',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      stage: 'Technical Round', 
      status: 'In Progress', 
      date: '15 Jun 2023',
      interviews: [{
        id: 'INT001', 
        type: 'Technical', 
        scheduledDate: '20 Jun 2023',
        interviewer: { id: 'EMP005', name: 'Rahul Sharma' }, 
        feedback: null, 
        status: 'Scheduled'
      }]
    },
    {
      id: 'CAN002', 
      name: 'Meera Nair', 
      position: 'UX Designer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      stage: 'Final Round', 
      status: 'In Progress', 
      date: '18 Jun 2023',
      interviews: [{
        id: 'INT002', 
        type: 'Portfolio Review', 
        scheduledDate: '22 Jun 2023',
        interviewer: { id: 'EMP008', name: 'Priya Patel' },
        feedback: null, 
        status: 'Scheduled'
      }]
    },
    {
      id: 'CAN003', 
      name: 'Rohan Desai', 
      position: 'Backend Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      stage: 'Screening', 
      status: 'In Progress', 
      date: '20 Jun 2023',
      interviews: []
    }
  ]);

  const [employees] = useState([
    { id: 'EMP005', name: 'Rahul Sharma', role: 'Senior Developer', avatar: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { id: 'EMP008', name: 'Priya Patel', role: 'Design Lead', avatar: 'https://randomuser.me/api/portraits/women/63.jpg' },
    { id: 'EMP010', name: 'Amit Singh', role: 'Engineering Manager', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }
  ]);

  const [hiringRecommendations] = useState([
    {
      id: 'REC001', 
      type: 'Department Need', 
      department: 'Engineering',
      position: 'Senior Frontend Developer', 
      priority: 'High',
      reason: 'Team expansion for new product line', 
      suggestedCount: 2
    },
    {
      id: 'REC002', 
      type: 'Workload', 
      department: 'Design',
      position: 'UI/UX Designer', 
      priority: 'Medium',
      reason: 'Increased design requirements for Q3 projects', 
      suggestedCount: 1
    }
  ]);

  const hiringStages = ['Job Requisition', 'Sourcing', 'Screening', 'Interviews', 'Offer', 'Onboarding'];

  const getStatusColor = (status) => {
    const colors = {
      selected: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      'in progress': 'bg-blue-100 text-blue-800',
      scheduled: 'bg-purple-100 text-purple-800',
      completed: 'bg-indigo-100 text-indigo-800'
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const handleScheduleInterview = (candidate) => {
    setSelectedCandidate(candidate);
    setShowScheduleModal(true);
  };

  const handleSubmitInterview = (e) => {
    e.preventDefault();
    const newInterview = {
      id: `INT${Date.now().toString().slice(-4)}`,
      type: 'Technical',
      scheduledDate: new Date().toLocaleDateString('en-GB'),
      interviewer: employees.find(e => e.id === 'EMP005'),
      feedback: null,
      status: 'Scheduled'
    };

    setCandidates(candidates.map(c => 
      c.id === selectedCandidate.id ? {
        ...c,
        interviews: [...c.interviews, newInterview],
        stage: 'Technical Round'
      } : c
    ));
    setShowScheduleModal(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const feedback = {
      rating: 4,
      strengths: 'Excellent technical skills',
      areasForImprovement: 'Could improve communication',
      recommendation: 'Hire',
      notes: 'Strong candidate overall'
    };

    setCandidates(candidates.map(c => {
      if (c.id === selectedCandidate.id) {
        const updatedInterviews = c.interviews.map(i => 
          i.id === selectedCandidate.interviews[0].id ? {
            ...i,
            feedback,
            status: 'Completed'
          } : i
        );
        return { 
          ...c, 
          interviews: updatedInterviews,
          status: updatedInterviews[0].feedback.recommendation === 'No Hire' ? 'Rejected' : 'Selected'
        };
      }
      return c;
    }));
    setShowFeedbackModal(false);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Recruitment Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your hiring process efficiently</p>
      </div>

      <div className="flex border-b border-gray-200 mb-8">
        {['candidates', 'recommendations', 'workflow'].map(tab => (
          <button
            key={tab}
            className={`relative py-3 px-6 font-medium text-sm ${activeTab === tab ? 
              'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                layoutId="underline"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'candidates' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:w-96">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search candidates by name or position..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
                  onClick={() => setShowHiringFlow(true)}
                >
                  <UserAddIcon className="h-5 w-5" />
                  Add Candidate
                </button>
              </div>

              {filteredCandidates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 text-gray-400">
                    <UserGroupIcon className="h-full w-full" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No candidates found</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your search or add a new candidate</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Candidate
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Interview
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredCandidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={candidate.avatar} alt={candidate.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                                <div className="text-sm text-gray-500">{candidate.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {candidate.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{candidate.stage}</div>
                            <div className="text-xs text-gray-500">{candidate.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {candidate.interviews.length > 0 ? (
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <img className="h-8 w-8 rounded-full" src={candidate.interviews[0].interviewer.avatar} alt={candidate.interviews[0].interviewer.name} />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{candidate.interviews[0].interviewer.name}</div>
                                  <div className="text-xs text-gray-500">{candidate.interviews[0].type}</div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">Not scheduled</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-3">
                              {candidate.interviews.length === 0 ? (
                                <button
                                  onClick={() => handleScheduleInterview(candidate)}
                                  className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                                >
                                  Schedule
                                </button>
                              ) : candidate.interviews[0]?.status === 'Scheduled' ? (
                                <button
                                  onClick={() => {
                                    setSelectedCandidate(candidate);
                                    setShowFeedbackModal(true);
                                  }}
                                  className="text-green-600 hover:text-green-900 transition-colors duration-200"
                                >
                                  Feedback
                                </button>
                              ) : (
                                <span className="text-gray-400">Completed</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Hiring Recommendations</h2>
                <p className="text-gray-600 mt-1">Based on department needs and project workload</p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {hiringRecommendations.map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{rec.position}</h3>
                        <p className="text-sm text-gray-500 mt-1">{rec.department} Department</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rec.priority === 'High' ? 'bg-red-100 text-red-800' : 
                        rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">{rec.reason}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">Suggested hires: {rec.suggestedCount}</span>
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                        onClick={() => {
                          setHiringForm({
                            position: rec.position,
                            department: rec.department,
                            hiringType: rec.type,
                            jobDescription: rec.reason
                          });
                          setShowHiringFlow(true);
                          setActiveTab('candidates');
                        }}
                      >
                        Start Hiring Process →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Hiring Workflow</h2>
                <p className="text-gray-600 mt-1">Track your current hiring process stages</p>
              </div>
              
              <div className="relative">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
                <div className="relative flex justify-between">
                  {hiringStages.map((stage, index) => (
                    <div key={index} className="flex flex-col items-center z-10">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                        index < 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-300 text-gray-400'
                      } transition-all duration-300`}>
                        {index + 1}
                      </div>
                      <div className={`text-sm font-medium ${
                        index < 2 ? 'text-blue-600' : 'text-gray-500'
                      }`}>
                        {stage}
                      </div>
                      {index < 2 && (
                        <div className="text-xs text-gray-500 mt-1 text-center">
                          {index === 0 ? 'Completed' : 'In Progress'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                      <UserAddIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">12</h3>
                      <p className="text-sm text-gray-500">New Candidates</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-5 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600">
                      <CheckCircleIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">5</h3>
                      <p className="text-sm text-gray-500">Hired This Month</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-5 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">8.2</h3>
                      <p className="text-sm text-gray-500">Avg. Days to Hire</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Interview Scheduling Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Schedule Interview</h3>
                    <p className="text-sm text-gray-500 mt-1">For {selectedCandidate?.name}</p>
                  </div>
                  <button 
                    onClick={() => setShowScheduleModal(false)} 
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitInterview} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>Technical</option>
                      <option>HR</option>
                      <option>Manager</option>
                      <option>Cultural Fit</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        />
                        <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input 
                        type="time" 
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name} ({emp.role})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea 
                      rows="2" 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Any special instructions for the interview..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                      Schedule Interview
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Interview Feedback</h3>
                    <p className="text-sm text-gray-500 mt-1">For {selectedCandidate?.name}</p>
                  </div>
                  <button 
                    onClick={() => setShowFeedbackModal(false)} 
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitFeedback} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <StarIcon 
                          key={star} 
                          className={`h-8 w-8 cursor-pointer ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-500">4/5</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Strengths</label>
                    <textarea 
                      rows="2" 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      defaultValue="Excellent technical skills"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Areas for Improvement</label>
                    <textarea 
                      rows="2" 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      defaultValue="Could improve communication"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recommendation</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <option>Strong Hire</option>
                      <option selected>Hire</option>
                      <option>Neutral</option>
                      <option>No Hire</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                    <textarea 
                      rows="3" 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      defaultValue="Strong candidate overall"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowFeedbackModal(false)}
                      className="px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hiring;