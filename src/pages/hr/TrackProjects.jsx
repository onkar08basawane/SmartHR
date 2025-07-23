
import React, { useState } from "react";
import {
  PlusIcon,
  XIcon,
  UserIcon,
  ExclamationCircleIcon
} from "@heroicons/react/outline";

const TrackProjects = () => {
  // Available team members (not currently assigned to any project)
  const availableTeam = [
    { id: 8, name: "Alex Turner", role: "Developer" },
    { id: 9, name: "Sophie Martinez", role: "Designer" },
    { id: 10, name: "Chris Evans", role: "QA" },
    { id: 11, name: "Lisa Ray", role: "Project Manager" },
  ];

  // Available experts for assignment
  const availableExperts = [
    { id: 101, name: "Dr. Emma Stone", role: "Senior Consultant" },
    { id: 102, name: "Michael Chen", role: "Technical Architect" },
    { id: 103, name: "Laura Bennett", role: "Agile Coach" },
  ];

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "HR Management System",
      progress: 80,
      teamPerformance: "High",
      deadline: "2025-08-15",
      assignedTeam: [
        { id: 1, name: "John Doe", role: "Developer", tasksCompleted: 12, totalTasks: 15 },
        { id: 2, name: "Jane Smith", role: "Designer", tasksCompleted: 8, totalTasks: 10 },
        { id: 3, name: "Mike Johnson", role: "QA", tasksCompleted: 5, totalTasks: 5 },
      ],
      blockers: ["Integration with payroll system", "Final UI approval pending"],
      assignedExpert: null,
    },
    {
      id: 2,
      name: "Employee Onboarding Portal",
      progress: 55,
      teamPerformance: "Medium",
      deadline: "2025-09-01",
      assignedTeam: [
        { id: 4, name: "Sarah Williams", role: "Developer", tasksCompleted: 7, totalTasks: 15 },
        { id: 5, name: "David Brown", role: "Designer", tasksCompleted: 4, totalTasks: 8 },
      ],
      blockers: ["Waiting for HR policy documents"],
      assignedExpert: null,
    },
    {
      id: 3,
      name: "Leave Management Tool",
      progress: 30,
      teamPerformance: "Low",
      deadline: "2025-07-30",
      assignedTeam: [
        { id: 6, name: "Emily Davis", role: "Developer", tasksCompleted: 3, totalTasks: 12 },
        { id: 7, name: "Robert Wilson", role: "Designer", tasksCompleted: 2, totalTasks: 6 },
      ],
      blockers: ["Legal compliance review", "Budget constraints", "Resource shortage"],
      assignedExpert: null,
    },
    {
      id: 3,
      name: "Matrimonial Matching System",
      progress: 20,
      teamPerformance: "Low",
      deadline: "2025-07-30",
      assignedTeam: [
        { id: 6, name: "Emily Davis", role: "Developer", tasksCompleted: 3, totalTasks: 12 },
        { id: 7, name: "Robert Wilson", role: "Designer", tasksCompleted: 2, totalTasks: 6 },
      ],
      blockers: ["Legal compliance review", "Budget constraints", "Resource shortage"],
      assignedExpert: null,
    },
  ]);

  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAssignExpertModal, setShowAssignExpertModal] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [newProject, setNewProject] = useState({
    name: "",
    deadline: "",
    assignedTeam: [],
  });
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    const project = {
      id: projects.length + 1,
      name: newProject.name,
      progress: 0,
      teamPerformance: "Medium",
      deadline: newProject.deadline,
      assignedTeam: selectedTeamMembers.map(member => ({
        ...member,
        tasksCompleted: 0,
        totalTasks: 0,
      })),
      blockers: [],
      assignedExpert: null,
    };

    setProjects([...projects, project]);
    setNewProject({ name: "", deadline: "", assignedTeam: [] });
    setSelectedTeamMembers([]);
    setShowAddProjectModal(false);
    alert("Project added successfully!");
  };

  const toggleTeamMemberSelection = (member) => {
    if (selectedTeamMembers.some(m => m.id === member.id)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, member]);
    }
  };

  const handleAssignExpert = (projectId) => {
    setCurrentProjectId(projectId);
    setSelectedExpert(null);
    setShowAssignExpertModal(true);
  };

  const handleConfirmAssignExpert = () => {
    if (!selectedExpert) {
      alert("Please select an expert to assign");
      return;
    }

    setProjects(projects.map(project => {
      if (project.id === currentProjectId) {
        return { ...project, assignedExpert: selectedExpert };
      }
      return project;
    }));
    setShowAssignExpertModal(false);
    setCurrentProjectId(null);
    setSelectedExpert(null);
    alert("Expert assigned successfully!");
  };

  const handleRemoveExpert = (projectId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return { ...project, assignedExpert: null };
      }
      return project;
    }));
    alert("Expert removed successfully!");
  };

  const toggleExpertSelection = (expert) => {
    setSelectedExpert(selectedExpert?.id === expert.id ? null : expert);
  };

  const isProjectStruggling = (project) => {
    return project.blockers.length > 0 || project.teamPerformance !== "High" || calculateDaysRemaining(project.deadline) < 7;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Track Projects</h1>
          <p className="text-gray-600 mt-2">Monitor and manage ongoing HR projects efficiently</p>
        </div>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
          onClick={() => setShowAddProjectModal(true)}
        >
          <PlusIcon className="h-5 w-5" />
          Add New Project
        </button>
      </div>

      {/* Add Project Modal */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Project</h2>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline *
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Team Members
                </label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
                  {availableTeam.map((member) => (
                    <div key={member.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`member-${member.id}`}
                        checked={selectedTeamMembers.some(m => m.id === member.id)}
                        onChange={() => toggleTeamMemberSelection(member)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`member-${member.id}`} className="text-sm text-gray-700">
                        {member.name} ({member.role})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAddProjectModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleAddProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Expert Modal */}
      {showAssignExpertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Assign Expert</h2>
              <button
                onClick={() => setShowAssignExpertModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Expert
                </label>
                <div className="border border-gray-200 rounded-lg p-3 max-h-40 overflow-y-auto bg-gray-50">
                  {availableExperts.map((expert) => (
                    <div key={expert.id} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`expert-${expert.id}`}
                        checked={selectedExpert?.id === expert.id}
                        onChange={() => toggleExpertSelection(expert)}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`expert-${expert.id}`} className="text-sm text-gray-700">
                        {expert.name} ({expert.role})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => setShowAssignExpertModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleConfirmAssignExpert}
              >
                Assign Expert
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${calculateDaysRemaining(project.deadline) < 7
                    ? "bg-red-100 text-red-800"
                    : calculateDaysRemaining(project.deadline) < 14
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
              >
                {calculateDaysRemaining(project.deadline)} days left
              </span>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Progress:</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${project.progress > 70
                      ? "bg-green-500"
                      : project.progress > 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500 mt-1">{project.progress}%</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Assigned Team:</p>
              <div className="space-y-3">
                {project.assignedTeam.map((member) => (
                  <div key={member.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {member.tasksCompleted}/{member.totalTasks} tasks
                      </p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{
                            width: `${member.totalTasks > 0 ? (member.tasksCompleted / member.totalTasks) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {project.assignedExpert && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Assigned Expert:</p>
                <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{project.assignedExpert.name}</p>
                      <p className="text-xs text-gray-500">{project.assignedExpert.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveExpert(project.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {project.blockers.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                  Blockers:
                </p>
                <ul className="list-disc list-inside text-sm text-red-600">
                  {project.blockers.map((blocker, i) => (
                    <li key={i}>{blocker}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="text-sm text-gray-700 border-t pt-2 flex justify-between items-center">
              <div>
                <p>
                  <strong>Team Performance:</strong>{" "}
                  <span
                    className={`font-medium ${project.teamPerformance === "High"
                        ? "text-green-600"
                        : project.teamPerformance === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                  >
                    {project.teamPerformance}
                  </span>
                </p>
                <p className="mt-1">
                  <strong>Deadline:</strong>{" "}
                  <span className={`font-medium ${calculateDaysRemaining(project.deadline) < 7 ? "text-red-600" : "text-gray-600"
                    }`}>
                    {project.deadline}
                  </span>
                </p>
              </div>

              {(project.teamPerformance === "Low" || calculateDaysRemaining(project.deadline) < 7) && !project.expertAssigned && (
                <button
                  onClick={() => handleAssignExpert(project.id)}
                  className="py-1 px-3 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 text-xs font-medium"
                >
                  Assign Expert
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackProjects;
