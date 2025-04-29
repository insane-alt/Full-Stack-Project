'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiBook,
  FiBarChart2,
  FiCheckCircle,
  FiMessageSquare,
  FiSettings,
  FiUser,
  FiFileText,
  FiPlus,
  FiActivity,
  FiHome,
  FiCalendar,
  FiAward,
  FiSearch,
  FiPieChart,
  FiTrendingUp,
  FiDownload
} from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const sections = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'users', label: 'Users & Roles', icon: FiUsers },
  { id: 'projects', label: 'Project Approvals', icon: FiBook },
  { id: 'collaborations', label: 'Collaborations', icon: FiCheckCircle },
  { id: 'reports', label: 'Reports', icon: FiBarChart2 },
  { id: 'testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { id: 'assessments', label: 'Assessment Activities', icon: FiActivity },
];

// Mock user data
const mockUsers = [
  { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Student', status: 'Active', department: 'Computer Science', year: '2024' },
  { id: 2, name: 'Priya Patel', email: 'priya@example.com', role: 'Mentor', status: 'Active', department: 'Environmental Engineering', year: '2023' },
  { id: 3, name: 'Anjali Verma', email: 'anjali@example.com', role: 'Admin', status: 'Active', department: 'Physics', year: '2024' },
  { id: 4, name: 'Siddharth Mehra', email: 'siddharth@example.com', role: 'Student', status: 'Inactive', department: 'Electronics', year: '2022' },
  { id: 5, name: 'Fatima Noor', email: 'fatima@example.com', role: 'Mentor', status: 'Active', department: 'Geography', year: '2023' },
  { id: 6, name: 'Vikram Singh', email: 'vikram@example.com', role: 'Collaborator', status: 'Active', department: 'Mechanical Engineering', year: '2024' },
  { id: 7, name: 'Meera Nair', email: 'meera@example.com', role: 'Student', status: 'Active', department: 'Electrical Engineering', year: '2022' },
  { id: 8, name: 'Arjun Desai', email: 'arjun@example.com', role: 'Mentor', status: 'Inactive', department: 'Civil Engineering', year: '2023' },
  { id: 9, name: 'Sara Khan', email: 'sara@example.com', role: 'Admin', status: 'Active', department: 'Physics', year: '2024' },
  { id: 10, name: 'Rohan Gupta', email: 'rohan@example.com', role: 'Student', status: 'Active', department: 'Computer Science', year: '2023' },
  { id: 11, name: 'Neha Joshi', email: 'neha@example.com', role: 'Collaborator', status: 'Inactive', department: 'Geography', year: '2022' },
  { id: 12, name: 'Amit Patel', email: 'amit@example.com', role: 'Mentor', status: 'Active', department: 'Mechanical Engineering', year: '2024' },
  { id: 13, name: 'Tanvi Rao', email: 'tanvi.rao@example.com', role: 'Student', status: 'Active', department: 'Computer Science', year: '2025' },
  { id: 14, name: 'Karan Mehta', email: 'karan.mehta@example.com', role: 'Mentor', status: 'Active', department: 'AIDS', year: '2025' },
  { id: 15, name: 'Sneha Pillai', email: 'sneha.pillai@example.com', role: 'Collaborator', status: 'Inactive', department: 'ECS', year: '2025' },
  { id: 16, name: 'Ritesh Kumar', email: 'ritesh.kumar@example.com', role: 'Admin', status: 'Active', department: 'Mechanical Engineering', year: '2025' },
  { id: 17, name: 'Aarav Shah', email: 'aarav.shah@example.com', role: 'Student', status: 'Active', department: 'AIDS', year: '2025' },
  { id: 18, name: 'Divya Menon', email: 'divya.menon@example.com', role: 'Mentor', status: 'Inactive', department: 'ECS', year: '2025' },
  { id: 19, name: 'Manish Sinha', email: 'manish.sinha@example.com', role: 'Collaborator', status: 'Active', department: 'Mechanical Engineering', year: '2025' },
  { id: 20, name: 'Pooja Iyer', email: 'pooja.iyer@example.com', role: 'Admin', status: 'Inactive', department: 'Computer Science', year: '2025' },
  { id: 21, name: 'Sahil Bansal', email: 'sahil.bansal@example.com', role: 'Student', status: 'Active', department: 'ECS', year: '2025' },
  { id: 22, name: 'Riya Kapoor', email: 'riya.kapoor@example.com', role: 'Mentor', status: 'Active', department: 'Mechanical Engineering', year: '2025' },
  { id: 23, name: 'Vikas Dubey', email: 'vikas.dubey@example.com', role: 'Collaborator', status: 'Inactive', department: 'AIDS', year: '2025' },
  { id: 24, name: 'Shreya Ghosh', email: 'shreya.ghosh@example.com', role: 'Admin', status: 'Active', department: 'ECS', year: '2025' },
  { id: 25, name: 'Nikhil Jain', email: 'nikhil.jain@example.com', role: 'Student', status: 'Inactive', department: 'Mechanical Engineering', year: '2025' },
  { id: 26, name: 'Priyanka Das', email: 'priyanka.das@example.com', role: 'Mentor', status: 'Active', department: 'Computer Science', year: '2025' },
  { id: 27, name: 'Harshita Singh', email: 'harshita.singh@example.com', role: 'Collaborator', status: 'Active', department: 'AIDS', year: '2025' },
  { id: 28, name: 'Yash Agarwal', email: 'yash.agarwal@example.com', role: 'Admin', status: 'Inactive', department: 'ECS', year: '2025' },
];

// Restrict department filter options and fix dropdown readability
// Replace uniqueDepartments with the allowed list
const allowedDepartments = ['All', 'Computer Science', 'AIDS', 'ECS', 'Mechanical Engineering'];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [year, setYear] = useState('All');
  const [department, setDepartment] = useState('All');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        // Calculate stats
        const totalProjects = 42; // Replace with real data if available
        const pendingApprovals = 7; // Replace with real data if available
        const activeProjects = 18; // Replace with real data if available

        // System notifications (mock data)
        const notifications = [
          { type: 'info', message: 'All systems operational.' },
          { type: 'warning', message: '3 users pending approval.' },
          { type: 'alert', message: '1 project submission overdue.' },
        ];
        const notificationCount = notifications.length;
        const latestNotification = notifications[0].message;

        // Recent user signups (last 5)
        const recentUsers = [...mockUsers].reverse().slice(0, 5);
        // Mock recent projects (last 5)
        const recentProjects = [
          { title: 'Smart Waste Management', lead: 'Tanvi Rao', status: 'Active' },
          { title: 'Urban Green Spaces', lead: 'Karan Mehta', status: 'Completed' },
          { title: 'Renewable Energy Kit', lead: 'Sneha Pillai', status: 'Active' },
          { title: 'Water Conservation', lead: 'Ritesh Kumar', status: 'Pending' },
          { title: 'Plastic Recycling', lead: 'Aarav Shah', status: 'Active' },
        ];
        // Mock pending actions
        const pendingActions = [
          { type: 'User', name: 'Divya Menon', action: 'Pending Approval' },
          { type: 'Project', name: 'Water Conservation', action: 'Pending Review' },
          { type: 'User', name: 'Vikas Dubey', action: 'Pending Approval' },
          { type: 'Project', name: 'Plastic Recycling', action: 'Pending Review' },
        ];

  return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* System Notifications Card */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative">
                <FiMessageSquare className="w-8 h-8 text-orange-500 mb-2" />
                <span className="text-lg font-bold text-orange-700 mb-1">System Notifications</span>
                <span className="text-gray-600 text-center mt-2">{latestNotification}</span>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <FiBook className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-3xl font-bold text-green-700">{totalProjects}</span>
                <span className="text-gray-600 mt-2">Projects</span>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <FiCheckCircle className="w-8 h-8 text-yellow-600 mb-2" />
                <span className="text-3xl font-bold text-yellow-700">{pendingApprovals}</span>
                <span className="text-gray-600 mt-2">Pending Approvals</span>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                <FiActivity className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-3xl font-bold text-purple-700">{activeProjects}</span>
                <span className="text-gray-600 mt-2">Active Projects</span>
              </div>
            </div>
            {/* Dashboard Overview Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent User Signups */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2"><FiUsers className="text-blue-400" /> Recent User Signups</h3>
                <ul className="divide-y divide-gray-100">
                  {recentUsers.map((user) => (
                    <li key={user.id} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-blue-900">{user.name}</span>
                        <span className="ml-2 text-xs text-gray-500">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'Mentor' ? 'bg-green-100 text-green-800' :
                          user.role === 'Collaborator' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>{user.role}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                        }`}>{user.status}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Recent Project Submissions */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-bold mb-4 text-green-900 flex items-center gap-2"><FiBook className="text-green-400" /> Recent Project Submissions</h3>
                <ul className="divide-y divide-gray-100">
                  {recentProjects.map((proj, idx) => (
                    <li key={idx} className="py-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-green-900">{proj.title}</span>
                        <span className="ml-2 text-xs text-gray-500">Lead: {proj.lead}</span>
          </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        proj.status === 'Active' ? 'bg-green-100 text-green-800' :
                        proj.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>{proj.status}</span>
                    </li>
                  ))}
                </ul>
                    </div>
                  </div>
            {/* Pending Actions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold mb-4 text-yellow-900 flex items-center gap-2"><FiCheckCircle className="text-yellow-400" /> Pending Actions</h3>
              <ul className="divide-y divide-gray-100">
                {pendingActions.map((item, idx) => (
                  <li key={idx} className="py-2 flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-500">{item.action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      case 'users':
        const uniqueRoles = ['All', ...Array.from(new Set(mockUsers.map(u => u.role)))];
        const uniqueYears = ['All', ...Array.from(new Set([...mockUsers.map(u => u.year), '2025']))];
        const filteredUsers = mockUsers.filter(user =>
          (search === '' || user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) &&
          (role === 'All' || user.role === role) &&
          (year === 'All' || user.year === year) &&
          (department === 'All' || user.department === department)
        );
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
            <div className="flex flex-wrap gap-4 mb-6 items-center">
              <motion.input
                whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #3b82f6' }}
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[220px] bg-white text-gray-900"
              />
              <motion.select
                whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #3b82f6' }}
                value={role}
                onChange={e => setRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
              >
                {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
              </motion.select>
              <motion.select
                whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #3b82f6' }}
                value={year}
                onChange={e => setYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
              >
                {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
              </motion.select>
              <motion.select
                whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #3b82f6' }}
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900"
              >
                {allowedDepartments.map(d => <option key={d} value={d} className="text-gray-900">{d}</option>)}
              </motion.select>
            </div>
            <div className="overflow-x-auto rounded-xl shadow bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredUsers.map(user => (
                    <motion.tr
                      key={user.id}
                      whileHover={{ scale: 1.01, backgroundColor: '#f0f6ff' }}
                      className="transition-all"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'Mentor' ? 'bg-green-100 text-green-800' :
                          user.role === 'Collaborator' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center gap-2 justify-center">
                          <motion.button whileHover={{ scale: 1.1 }} className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold text-xs hover:bg-blue-200 transition">Edit</motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-bold text-xs hover:bg-yellow-200 transition">Change Role</motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} className="px-2 py-1 bg-red-100 text-red-700 rounded font-bold text-xs hover:bg-red-200 transition">{user.status === 'Active' ? 'Deactivate' : 'Activate'}</motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        );
      case 'projects':
        // Mock project data
        const allProjects = [
          { id: 1, title: 'Smart Waste Management', lead: 'Tanvi Rao', date: '2025-04-20', status: 'Pending' },
          { id: 2, title: 'Urban Green Spaces', lead: 'Karan Mehta', date: '2025-04-18', status: 'Approved' },
          { id: 3, title: 'Renewable Energy Kit', lead: 'Sneha Pillai', date: '2025-04-15', status: 'Pending' },
          { id: 4, title: 'Water Conservation', lead: 'Ritesh Kumar', date: '2025-04-10', status: 'Rejected' },
          { id: 5, title: 'Plastic Recycling', lead: 'Aarav Shah', date: '2025-04-08', status: 'Approved' },
          { id: 6, title: 'Solar Panel Initiative', lead: 'Divya Menon', date: '2025-04-05', status: 'Pending' },
        ];
        const pendingProjects = allProjects.filter(p => p.status === 'Pending');

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-10">
            {/* Pending Project Approvals */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-900">Pending Project Approvals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Team Lead</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Submission Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {pendingProjects.length === 0 ? (
                      <tr><td colSpan={5} className="text-center py-6 text-gray-400">No pending projects.</td></tr>
                    ) : (
                      pendingProjects.map(project => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{project.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{project.lead}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{project.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">{project.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <button className="px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs hover:bg-green-200 transition">Approve</button>
                              <button className="px-3 py-1 bg-red-100 text-red-700 rounded font-bold text-xs hover:bg-red-200 transition">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* All Projects */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-900">All Projects</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Team Lead</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Submission Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {allProjects.map(project => (
                      <tr key={project.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{project.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{project.lead}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{project.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            project.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            project.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            project.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </div>
                  </div>
          </motion.div>
        );
      case 'collaborations':
        // Mock mentorship/collaboration requests
        const mentorshipRequests = [
          { id: 1, project: 'Smart Waste Management', student: 'Tanvi Rao', mentor: 'Dr. Smith', date: '2025-04-20', status: 'Pending' },
          { id: 2, project: 'Urban Green Spaces', student: 'Karan Mehta', mentor: 'Prof. Johnson', date: '2025-04-18', status: 'Approved' },
          { id: 3, project: 'Renewable Energy Kit', student: 'Sneha Pillai', mentor: 'Dr. Lee', date: '2025-04-15', status: 'Pending' },
          { id: 4, project: 'Water Conservation', student: 'Ritesh Kumar', mentor: 'Prof. Gupta', date: '2025-04-10', status: 'Rejected' },
          { id: 5, project: 'Plastic Recycling', student: 'Aarav Shah', mentor: 'Dr. Patel', date: '2025-04-08', status: 'Pending' },
        ];
        const pendingMentorships = mentorshipRequests.filter(r => r.status === 'Pending');

        // Add mock collaboration requests from students, experts, mentors
        const collaborationRequests = [
          { id: 1, project: 'Smart Waste Management', requester: 'Tanvi Rao', type: 'Student', contact: 'tanvi.rao@example.com', date: '2025-04-21', status: 'Pending' },
          { id: 2, project: 'Urban Green Spaces', requester: 'GreenTech Solutions', type: 'Expert', contact: 'contact@greentech.com', date: '2025-04-20', status: 'Pending' },
          { id: 3, project: 'Renewable Energy Kit', requester: 'Dr. Lee', type: 'Mentor', contact: 'dr.lee@example.com', date: '2025-04-19', status: 'Approved' },
          { id: 4, project: 'Water Conservation', requester: 'City Water Board', type: 'Expert', contact: 'info@citywater.gov', date: '2025-04-18', status: 'Rejected' },
          { id: 5, project: 'Plastic Recycling', requester: 'Sneha Pillai', type: 'Student', contact: 'sneha.pillai@example.com', date: '2025-04-17', status: 'Pending' },
        ];
        const pendingCollaborations = collaborationRequests.filter(r => r.status === 'Pending');

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-10">
            {/* Collaboration Requests from Students/Experts/Mentors */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-green-900">Collaboration Requests</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requester Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requester Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date of Request</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {pendingCollaborations.length === 0 ? (
                      <tr><td colSpan={7} className="text-center py-6 text-gray-400">No pending collaboration requests.</td></tr>
                    ) : (
                      pendingCollaborations.map(request => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{request.project}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.requester}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              request.type === 'Student' ? 'bg-blue-100 text-blue-800' :
                              request.type === 'Expert' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>{request.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.contact}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">{request.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <button className="px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs hover:bg-green-200 transition">Approve</button>
                              <button className="px-3 py-1 bg-red-100 text-red-700 rounded font-bold text-xs hover:bg-red-200 transition">Reject</button>
                              <a href={`mailto:${request.contact}`} className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-bold text-xs hover:bg-blue-200 transition">Contact</a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Pending Mentorship/Collaboration Requests */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-900">Pending Mentorship Requests</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requested Mentor</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date of Request</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {pendingMentorships.length === 0 ? (
                      <tr><td colSpan={6} className="text-center py-6 text-gray-400">No pending requests.</td></tr>
                    ) : (
                      pendingMentorships.map(request => (
                        <tr key={request.id}>
                          <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{request.project}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.student}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.mentor}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">{request.status}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <button className="px-3 py-1 bg-green-100 text-green-800 rounded font-bold text-xs hover:bg-green-200 transition">Approve</button>
                              <button className="px-3 py-1 bg-red-100 text-red-700 rounded font-bold text-xs hover:bg-red-200 transition">Reject</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {/* All Mentorship/Collaboration Requests */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-900">All Mentorship Requests</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Project Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Student Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Requested Mentor</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date of Request</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {mentorshipRequests.map(request => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{request.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.student}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.mentor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{request.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            request.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                    </div>
                  </div>
          </motion.div>
        );
      case 'reports':
        // Realistic mock data for charts
        const projectStatusStats = [
          { name: 'Approved', value: 22 },
          { name: 'Pending', value: 9 },
          { name: 'Rejected', value: 3 },
        ];
        // SDG Impact: all 17 SDGs with mock values
        const sdgImpactStats = Array.from({ length: 17 }, (_, i) => ({
          name: `SDG ${i + 1}`,
          value: 4 + Math.floor(Math.random() * 12) // values between 4 and 15
        }));
        const SDG_COLORS = [
          '#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#f472b6', '#facc15', '#4ade80', '#818cf8', '#fb7185',
          '#f59e42', '#10b981', '#6366f1', '#eab308', '#f43f5e', '#06b6d4', '#a3e635'
        ];
        const collaborationStats = [
          { name: 'Student', value: 15 },
          { name: 'Mentor', value: 7 },
          { name: 'Expert', value: 4 },
        ];
        const COLORS = ['#34d399', '#fbbf24', '#f87171', '#60a5fa', '#a78bfa', '#f472b6'];
        // Mock data for reports
        const reports = [
          { id: 1, title: 'Project Report Q1 2025', type: 'Projects', date: '2025-04-01' },
          { id: 2, title: 'User Engagement March 2025', type: 'Users', date: '2025-03-31' },
          { id: 3, title: 'Collaboration Summary', type: 'Collaborations', date: '2025-03-28' },
        ];

        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 space-y-10">
            {/* SDG Impact Pie Chart */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 text-green-900 flex items-center gap-2"><FiPieChart className="text-green-400" /> SDG Impact</h2>
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                <ResponsiveContainer width={420} height={340}>
                  <PieChart>
                    <Pie data={sdgImpactStats} dataKey="value" nameKey="name" cx="45%" cy="50%" outerRadius={120} label={false}>
                      {sdgImpactStats.map((entry, index) => (
                        <Cell key={`cell-sdg-${index}`} fill={SDG_COLORS[index % SDG_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="max-h-[320px] overflow-y-auto w-40">
                  <ul className="text-xs space-y-2">
                    {sdgImpactStats.map((entry, idx) => (
                      <li key={entry.name} className="flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: SDG_COLORS[idx % SDG_COLORS.length] }}></span>
                        <span className="font-semibold">{entry.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Collaborations Bar Chart */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 text-purple-900 flex items-center gap-2"><FiUsers className="text-purple-400" /> Collaborations</h2>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collaborationStats}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#a78bfa">
                      {collaborationStats.map((entry, index) => (
                        <Cell key={`cell-collab-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Project Statistics Bar Chart */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-bold mb-4 text-blue-900 flex items-center gap-2"><FiBarChart2 className="text-blue-400" /> Project Statistics</h2>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={projectStatusStats}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#3b82f6">
                      {projectStatusStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Reports Table */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FiFileText className="text-blue-400" /> Generated Reports</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date Generated</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Download</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {[
                      { id: 1, title: 'Project Report Q1 2025', type: 'Projects', date: '2025-04-01' },
                      { id: 2, title: 'User Engagement March 2025', type: 'Users', date: '2025-03-31' },
                      { id: 3, title: 'Collaboration Summary', type: 'Collaborations', date: '2025-03-28' },
                      { id: 4, title: 'SDG Impact Analysis', type: 'SDG', date: '2025-03-25' },
                      { id: 5, title: 'Mentor Activity Report', type: 'Users', date: '2025-03-20' },
                      { id: 6, title: 'Pending Projects Overview', type: 'Projects', date: '2025-03-15' },
                      { id: 7, title: 'Annual Collaboration Trends', type: 'Collaborations', date: '2025-03-10' },
                    ].map(report => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{report.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            report.type === 'Projects' ? 'bg-green-100 text-green-800' :
                            report.type === 'Users' ? 'bg-blue-100 text-blue-800' :
                            report.type === 'SDG' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{report.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded font-bold text-xs hover:bg-blue-200 transition flex items-center gap-1"><FiDownload /> Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'testimonials':
        // Expanded mock comments data
        const testimonials = [
          { id: 1, name: 'Rahul Sharma', role: 'Student', comment: 'Great mentorship experience!', date: '2025-04-20' },
          { id: 2, name: 'Priya Patel', role: 'Mentor', comment: 'Impressed by the project quality.', date: '2025-04-18' },
          { id: 3, name: 'Anjali Verma', role: 'Admin', comment: 'System is easy to use.', date: '2025-04-15' },
          { id: 4, name: 'Siddharth Mehra', role: 'Student', comment: 'Would love more collaboration features.', date: '2025-04-12' },
          { id: 5, name: 'Fatima Noor', role: 'Mentor', comment: 'Excellent support from the team.', date: '2025-04-10' },
          { id: 6, name: 'Vikram Singh', role: 'Collaborator', comment: 'Collaboration process was smooth and efficient.', date: '2025-04-09' },
          { id: 7, name: 'Meera Nair', role: 'Student', comment: 'The dashboard UI is very intuitive.', date: '2025-04-08' },
          { id: 8, name: 'Arjun Desai', role: 'Mentor', comment: 'Appreciate the timely updates and notifications.', date: '2025-04-07' },
          { id: 9, name: 'Sara Khan', role: 'Admin', comment: 'Would like to see more analytics features.', date: '2025-04-06' },
          { id: 10, name: 'Rohan Gupta', role: 'Student', comment: 'Easy to submit projects and track progress.', date: '2025-04-05' },
          { id: 11, name: 'Neha Joshi', role: 'Collaborator', comment: 'Great platform for connecting with students.', date: '2025-04-04' },
          { id: 12, name: 'Amit Patel', role: 'Mentor', comment: 'Mentorship requests are well organized.', date: '2025-04-03' },
        ];
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FiMessageSquare className="text-blue-400" /> Comments & Feedback</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Comment</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {testimonials.map(t => (
                      <tr key={t.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{t.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            t.role === 'Admin' ? 'bg-blue-100 text-blue-800' :
                            t.role === 'Mentor' ? 'bg-green-100 text-green-800' :
                            t.role === 'Collaborator' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {t.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700 max-w-xs truncate" title={t.comment}>{t.comment}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{t.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-bold text-xs hover:bg-gray-200 transition">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'assessments':
        // Expanded mock assessment activities data
        const assessments = [
          { id: 1, name: 'Phase 1 Submission', type: 'Phase 1', project: 'Smart Waste Management', date: '2025-04-22', status: 'Scheduled' },
          { id: 2, name: 'Phase 2 Review', type: 'Phase 2', project: 'Urban Green Spaces', date: '2025-04-18', status: 'Completed' },
          { id: 3, name: 'Final Evaluation', type: 'Final', project: 'Renewable Energy Kit', date: '2025-04-15', status: 'Pending' },
          { id: 4, name: 'Phase 1 Submission', type: 'Phase 1', project: 'Water Conservation', date: '2025-04-12', status: 'Scheduled' },
          { id: 5, name: 'Phase 2 Review', type: 'Phase 2', project: 'Plastic Recycling', date: '2025-04-10', status: 'Completed' },
          { id: 6, name: 'Demo Day', type: 'Demo', project: 'Solar Panel Initiative', date: '2025-04-08', status: 'Pending' },
          { id: 7, name: 'Phase 1 Submission', type: 'Phase 1', project: 'E-Waste Management', date: '2025-04-06', status: 'Completed' },
          { id: 8, name: 'Phase 2 Review', type: 'Phase 2', project: 'Rainwater Harvesting', date: '2025-04-04', status: 'Scheduled' },
          { id: 9, name: 'Final Evaluation', type: 'Final', project: 'Green Campus Initiative', date: '2025-04-02', status: 'Pending' },
          { id: 10, name: 'Demo Day', type: 'Demo', project: 'Plastic to Fuel', date: '2025-03-30', status: 'Completed' },
          { id: 11, name: 'Phase 1 Submission', type: 'Phase 1', project: 'Smart Irrigation', date: '2025-03-28', status: 'Scheduled' },
          { id: 12, name: 'Phase 2 Review', type: 'Phase 2', project: 'Clean Air Project', date: '2025-03-26', status: 'Completed' },
        ];
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2"><FiActivity className="text-blue-400" /> Assessment Activities</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Activity Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Related Project</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {assessments.map(a => (
                      <tr key={a.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-blue-900">{a.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            a.type === 'Phase 1' ? 'bg-yellow-100 text-yellow-800' :
                            a.type === 'Phase 2' ? 'bg-green-100 text-green-800' :
                            a.type === 'Final' ? 'bg-blue-100 text-blue-800' :
                            a.type === 'Demo' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {a.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{a.project}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{a.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            a.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            a.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                            a.status === 'Pending' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <button className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold text-xs hover:bg-blue-200 transition">View</button>
                            <button className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded font-bold text-xs hover:bg-yellow-200 transition">Edit</button>
                            <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded font-bold text-xs hover:bg-gray-200 transition">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl rounded-r-2xl border border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Admin Dashboard</h1>
        </div>
        <nav className="mt-2 flex-1">
          {sections.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              whileHover={{ scale: 1.04, backgroundColor: '#f0f6ff' }}
              className={`w-full flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg mb-1 relative ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400">&copy; 2024 Your Institution</div>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white shadow-sm sticky top-0 z-10">
          <div className="text-lg font-bold text-blue-900">{sections.find(s => s.id === activeSection)?.label}</div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all">
            <FiPlus /> Quick Action
          </button>
          </div>
        {/* Dynamic Section Content */}
        {renderSection()}
      </div>
    </div>
  );
} 