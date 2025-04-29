'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import * as FiIcons from 'react-icons/fi';
import ProjectCreationForm from '@/components/ProjectCreationForm';
import MentorshipRequestForm from '@/components/MentorshipRequestForm';
import FileUpload from '@/components/FileUpload';
import ProjectSearch from '@/components/ProjectSearch';
import CollaborationHub from '@/components/CollaborationHub';
import ProjectTimeline from '@/components/ProjectTimeline';

import Link from 'next/link';
import axiosInstance from '@/api/axiosInstance';

// Add these interfaces at the top of the file
interface Project {
  id: number;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
  sdgs: string;
}

// Helper to map SDG name to number
function getSDGNumberFromName(name: string) {
  const mapping: { [key: string]: number } = {
    'No Poverty': 1,
    'Zero Hunger': 2,
    'Good Health and Sanitation': 3,
    'Good Health and Well-being': 3,
    'Quality Education': 4,
    'Gender Equality': 5,
    'Clean Water and Sanitation': 6,
    'Affordable and Clean Energy': 7,
    'Decent Work and Economic Growth': 8,
    'Industry, Innovation and Infrastructure': 9,
    'Reduced Inequalities': 10,
    'Sustainable Cities': 11,
    'Responsible Consumption and Production': 12,
    'Climate Action': 13,
    'Life Below Water': 14,
    'Life on Land': 15,
    'Peace, Justice and Strong Institutions': 16,
    'Partnerships for the Goals': 17,
  };
  return mapping[name] || name;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('my-projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const studentId = 1;
        if (!studentId) {
          throw new Error('User ID not found');
        }

        const response = await axiosInstance.get(`/students/projects/`);
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const unreadNotifications = 3;

  const renderContent = () => {
    switch (activeTab) {
      case 'my-projects':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-2 bg-orange-400" />
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <FiIcons.FiSmile className="text-blue-400" /> Welcome, {user?.name}!
                </h1>
                <p className="text-gray-600">Manage your sustainable development projects and track your impact.</p>
              </div>
            </div>

            {/* Create Project Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-2 bg-green-500" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FiIcons.FiPlusCircle className="text-green-400" /> Create New Project
                  </h3>
                  <button
                    onClick={() => setActiveTab('create-project')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
                  >
                    <FiIcons.FiPlus className="mr-2" /> New Project
                  </button>
                </div>
                <p className="text-gray-600">Start a new project and map it to relevant SDGs</p>
              </div>
            </div>

            {/* Active Projects List */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-2 bg-purple-500" />
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <FiIcons.FiList className="text-purple-400" /> Active Projects
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  <div className="p-6 text-center">Loading projects...</div>
                ) : error ? (
                  <div className="p-6 text-center text-red-500">{error}</div>
                ) : projects.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No projects found</div>
                ) : (
                  projects.map((project) => (
                    <Link
                      href={`/dashboard/student/projects/${project.id}`}
                      key={project.id}
                      className="block hover:bg-blue-50 transition rounded-2xl"
                    >
                      <div className="p-6 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-medium text-gray-900">
                              {project.title}
                            </h4>
                            <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FiIcons.FiCalendar className="text-blue-400" />
                                Start: {project.startDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <FiIcons.FiCalendar className="text-green-400" />
                                End: {project.endDate}
                              </span>
                            </div>
                            <p className="mt-1 text-gray-600">
                              SDGs: {project.sdgs.split(',').map((sdgName, idx, arr) =>
                                `SDG ${getSDGNumberFromName(sdgName.trim())}${idx < arr.length - 1 ? ', ' : ''}`
                              ).join('')}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 italic">
                              {project.summary}
                            </p>
                          </div>
                          <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-bold border shadow-sm ${project.status === 'In Progress'
                            ? 'bg-green-100 text-green-700 border-green-300'
                            : 'bg-blue-100 text-blue-700 border-blue-300'
                            }`}>
                            <FiIcons.FiZap className={`mr-1 ${project.status === 'In Progress'
                              ? 'text-green-400'
                              : 'text-blue-400'
                              }`} />
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case 'create-project':
        return <ProjectCreationForm />;

      case 'find-projects':
        return <ProjectSearch />;

      case 'mentorship':
        return <MentorshipRequestForm />;

      case 'collaboration':
        return <CollaborationHub />;

      case 'notifications':
        const notifications = [
          {
            id: 1,
            type: 'approval',
            from: 'Admin',
            message: 'Your project "Smart Water Management System" has been approved! Congratulations!',
            time: '2 hours ago',
            icon: <FiIcons.FiCheckCircle className="text-green-500 text-xl" />,
            color: 'bg-green-50',
          },
          {
            id: 2,
            type: 'feedback',
            from: 'Mentor (Dr. Smith)',
            message: 'Great progress on your milestone! Please add more details to the impact section.',
            time: '5 hours ago',
            icon: <FiIcons.FiMessageSquare className="text-blue-500 text-xl" />,
            color: 'bg-blue-50',
          },
          {
            id: 3,
            type: 'request',
            from: 'Admin',
            message: 'Please submit your project documentation for final review.',
            time: '1 day ago',
            icon: <FiIcons.FiFileText className="text-yellow-500 text-xl" />,
            color: 'bg-yellow-50',
          },
          {
            id: 4,
            type: 'work',
            from: 'Mentor (Ms. Patel)',
            message: 'Your recent work on the AI model has been impressive. Keep it up!',
            time: '2 days ago',
            icon: <FiIcons.FiStar className="text-purple-500 text-xl" />,
            color: 'bg-purple-50',
          },
        ];
        return (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiIcons.FiBell className="text-blue-400" /> Notifications
            </h2>
            <div className="space-y-4">
              {notifications.map(n => (
                <div key={n.id} className={`flex items-start gap-4 p-4 rounded-xl shadow-sm border border-gray-100 ${n.color}`}>
                  <div>{n.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800">{n.message}</div>
                    <div className="text-xs text-gray-500 mt-1">From: {n.from} &middot; {n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 h-fit">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('my-projects')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === 'my-projects'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiFolder className="mr-3" />
                My Projects
              </button>
              <button
                onClick={() => setActiveTab('create-project')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === 'create-project'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiPlus className="mr-3" />
                Create Project
              </button>
              <button
                onClick={() => setActiveTab('find-projects')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === 'find-projects'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiSearch className="mr-3" />
                Find Projects
              </button>
              <button
                onClick={() => setActiveTab('mentorship')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === 'mentorship'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiUsers className="mr-3" />
                Mentorship
              </button>
              <button
                onClick={() => setActiveTab('collaboration')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${activeTab === 'collaboration'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiUsers className="mr-3" />
                Collaboration
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 relative ${activeTab === 'notifications'
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-50'}
                  `}
              >
                <FiIcons.FiBell className="mr-3" />
                Notifications
                {unreadNotifications > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white absolute right-4 top-2 shadow">
                    {unreadNotifications}
                  </span>
                )}
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}