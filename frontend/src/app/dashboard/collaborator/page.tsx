'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FiSearch, FiFilter, FiExternalLink, FiGithub, FiMail, FiLinkedin, FiUpload, FiFile, FiLink, FiDownload, FiX } from 'react-icons/fi';

// SDG List
const SDG_LIST = [
  { value: '1', label: 'SDG 1: No Poverty' },
  { value: '2', label: 'SDG 2: Zero Hunger' },
  { value: '3', label: 'SDG 3: Good Health' },
  { value: '4', label: 'SDG 4: Quality Education' },
  { value: '5', label: 'SDG 5: Gender Equality' },
  { value: '6', label: 'SDG 6: Clean Water' },
  { value: '7', label: 'SDG 7: Affordable Energy' },
  { value: '8', label: 'SDG 8: Decent Work' },
  { value: '9', label: 'SDG 9: Industry Innovation' },
  { value: '10', label: 'SDG 10: Reduced Inequalities' },
  { value: '11', label: 'SDG 11: Sustainable Cities' },
  { value: '12', label: 'SDG 12: Responsible Consumption' },
  { value: '13', label: 'SDG 13: Climate Action' },
  { value: '14', label: 'SDG 14: Life Below Water' },
  { value: '15', label: 'SDG 15: Life on Land' },
  { value: '16', label: 'SDG 16: Peace and Justice' },
  { value: '17', label: 'SDG 17: Partnerships' }
];

// Departments
const DEPARTMENTS = [
  'Computer Science',
  'Electronic and Computer Science', 
  'Mechanical Engineering',
  'AIDS'
];

// Type definitions
type Project = {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  year: number;
  department: string;
  sdg: string;
  status: 'active' | 'completed';
  members: {
    name: string;
    role: string;
    email: string;
    github?: string;
    linkedin?: string;
  }[];
};

type Collaboration = {
  id: string;
  projectId: string;
  projectTitle: string;
  role: string;
  status: 'pending' | 'active' | 'completed';
  startDate: string;
  endDate?: string;
  timeCommitment: string;
};

type Resource = {
  id: string;
  title: string;
  type: 'document' | 'link' | 'file';
  url: string;
  projectId?: string;
  uploadDate: string;
  uploadedBy: string;
  description?: string;
};

export default function CollaboratorDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'collaborations' | 'resources'>('projects');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: '',
    department: '',
    sdg: ''
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCollaboration, setSelectedCollaboration] = useState<Collaboration | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'document' as 'document' | 'link' | 'file',
    url: '',
    projectId: '',
    description: ''
  });

  // Generate years from 2000 to 2025
  const years = Array.from({ length: 26 }, (_, i) => 2000 + i).reverse();

  // Sample projects data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'AI for Sustainable Agriculture',
      description: 'Developing machine learning models to optimize crop yields',
      detailedDescription: 'This project focuses on creating AI models that analyze soil conditions, weather patterns, and crop health to provide farmers with actionable insights. Our goal is to reduce water consumption by 30% while maintaining or increasing yields.',
      year: 2023,
      department: 'Computer Science',
      sdg: '2',
      status: 'active',
      members: [
        { name: 'Dr. Sarah Chen', role: 'Lead Researcher', email: 's.chen@univ.edu', github: 'sarah-ai', linkedin: 'sarah-chen' },
        { name: 'Raj Patel', role: 'ML Engineer', email: 'r.patel@univ.edu', github: 'rajml', linkedin: 'raj-patel' }
      ]
    },
    // Add 6 more projects following the same structure
    {
      id: '2',
      title: 'Renewable Energy Monitoring',
      description: 'IoT system for monitoring renewable energy installations',
      detailedDescription: 'Developing a scalable IoT solution to monitor solar panel efficiency and predict maintenance needs.',
      year: 2024,
      department: 'Electronic and Computer Science',
      sdg: '7',
      status: 'active',
      members: [
        { name: 'Prof. James Wilson', role: 'Project Lead', email: 'j.wilson@univ.edu', github: 'jamesiot', linkedin: 'james-wilson' }
      ]
    },
    {
      id: '3',
      title: 'Water Purification Tech',
      description: 'Low-cost water purification for rural communities',
      detailedDescription: 'Creating affordable, maintenance-free water purification systems using sustainable materials.',
      year: 2022,
      department: 'Mechanical Engineering',
      sdg: '6',
      status: 'active',
      members: [
        { name: 'Dr. Robert Kim', role: 'Lead Engineer', email: 'r.kim@univ.edu', github: 'robkimeng', linkedin: 'robert-kim' }
      ]
    },
    {
      id: '4',
      title: 'Healthcare Access Platform',
      description: 'Digital platform for remote healthcare access',
      detailedDescription: 'Creating an accessible telemedicine platform with AI-powered triage for underserved communities.',
      year: 2023,
      department: 'AIDS',
      sdg: '3',
      status: 'active',
      members: [
        { name: 'Dr. Fatima Ahmed', role: 'Project Lead', email: 'f.ahmed@univ.edu', github: 'fatima-hc', linkedin: 'fatima-ahmed' }
      ]
    },
    {
      id: '5',
      title: 'Smart Urban Farming',
      description: 'Vertical farming with automated nutrient systems',
      detailedDescription: 'Developing compact, automated farming units for urban environments that optimize space and resources.',
      year: 2021,
      department: 'Electronic and Computer Science',
      sdg: '11',
      status: 'completed',
      members: [
        { name: 'Prof. Emily Zhang', role: 'Lead Researcher', email: 'e.zhang@univ.edu', github: 'emily-agri', linkedin: 'emily-zhang' }
      ]
    },
    {
      id: '6',
      title: 'Educational VR Platform',
      description: 'VR environment for STEM education',
      detailedDescription: 'Building an accessible VR platform that brings complex STEM concepts to life for students.',
      year: 2024,
      department: 'Computer Science',
      sdg: '4',
      status: 'active',
      members: [
        { name: 'Dr. Carlos Mendez', role: 'Project Lead', email: 'c.mendez@univ.edu', github: 'carlosvr', linkedin: 'carlos-mendez' }
      ]
    },
    {
      id: '7',
      title: 'Waste Reduction AI',
      description: 'ML system for optimizing waste collection',
      detailedDescription: 'Developing predictive algorithms to optimize waste collection routes and schedules.',
      year: 2023,
      department: 'Computer Science',
      sdg: '12',
      status: 'active',
      members: [
        { name: 'Dr. Thomas Lee', role: 'Lead Data Scientist', email: 't.lee@univ.edu', github: 'tomlee-ai', linkedin: 'thomas-lee' }
      ]
    }
  ]);

  // Sample collaborations data
  const [collaborations, setCollaborations] = useState<Collaboration[]>([
    {
      id: '1',
      projectId: '1',
      projectTitle: 'AI for Sustainable Agriculture',
      role: 'Data Analyst',
      status: 'active',
      startDate: '2023-03-15',
      timeCommitment: '10 hours/week'
    },
    {
      id: '2',
      projectId: '2',
      projectTitle: 'Renewable Energy Monitoring',
      role: 'Software Developer',
      status: 'pending',
      startDate: '2024-01-10',
      timeCommitment: '15 hours/week'
    },
    {
      id: '3',
      projectId: '4',
      projectTitle: 'Healthcare Access Platform',
      role: 'UI/UX Designer',
      status: 'completed',
      startDate: '2022-08-01',
      endDate: '2023-05-30',
      timeCommitment: '8 hours/week'
    },
    {
      id: '4',
      projectId: '6',
      projectTitle: 'Educational VR Platform',
      role: 'Content Developer',
      status: 'active',
      startDate: '2023-11-15',
      timeCommitment: '12 hours/week'
    }
  ]);

  // Sample resources data
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Project Management Guidelines',
      type: 'document',
      url: '/resources/pm-guidelines.pdf',
      projectId: '1',
      uploadDate: '2023-04-10',
      uploadedBy: 'Dr. Sarah Chen',
      description: 'Comprehensive guidelines for managing collaborative research projects'
    },
    {
      id: '2',
      title: 'SDG Implementation Framework',
      type: 'link',
      url: 'https://sdgframework.org',
      uploadDate: '2023-02-15',
      uploadedBy: 'University Research Office',
      description: 'Official framework for implementing SDGs in academic projects'
    },
    {
      id: '3',
      title: 'Data Collection Templates',
      type: 'file',
      url: '/resources/data-templates.zip',
      projectId: '2',
      uploadDate: '2023-09-22',
      uploadedBy: 'Aisha Khan',
      description: 'Standardized templates for field data collection'
    },
    {
      id: '4',
      title: 'Ethical AI Guidelines',
      type: 'document',
      url: '/resources/ai-ethics.pdf',
      projectId: '1',
      uploadDate: '2023-05-18',
      uploadedBy: 'Raj Patel',
      description: 'Guidelines for ethical AI development in research projects'
    },
    {
      id: '5',
      title: 'Community Engagement Handbook',
      type: 'document',
      url: '/resources/community-handbook.pdf',
      projectId: '4',
      uploadDate: '2023-07-30',
      uploadedBy: 'Dr. Fatima Ahmed',
      description: 'Best practices for community engagement in health projects'
    }
  ]);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !filters.year || project.year.toString() === filters.year;
    const matchesDept = !filters.department || project.department === filters.department;
    const matchesSDG = !filters.sdg || project.sdg === filters.sdg;
    
    return matchesSearch && matchesYear && matchesDept && matchesSDG;
  });

  // Handle resource upload
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new resource
    const newResource: Resource = {
      id: `res-${resources.length + 1}`,
      title: uploadForm.title,
      type: uploadForm.type,
      url: uploadForm.type === 'file' 
        ? (fileInputRef.current?.files?.[0]?.name || '') 
        : uploadForm.url,
      projectId: uploadForm.projectId || undefined,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: user?.name || 'You',
      description: uploadForm.description
    };
    
    // Add to resources
    setResources([...resources, newResource]);
    
    // Reset form
    setUploadForm({
      title: '',
      type: 'document',
      url: '',
      projectId: '',
      description: ''
    });
    setShowUploadModal(false);
  };

  // Handle file selection
  const handleFileUploadClick = () => {
    if (uploadForm.type === 'file') {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Collaborator Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, <span className="font-medium text-blue-600">{user?.name || 'Collaborator'}</span>
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          {(['projects', 'collaborations', 'resources'] as const).map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Available Projects</h2>
                
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center mb-3">
                  <FiFilter className="text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Filter Projects</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                      value={filters.year}
                      onChange={(e) => setFilters({...filters, year: e.target.value})}
                      title='Select Year'
                    >
                      <option value="">All Years</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                      value={filters.department}
                      onChange={(e) => setFilters({...filters, department: e.target.value})}
                      title='Select Department'
                    >
                      <option value="">All Departments</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sustainable Development Goal</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                      value={filters.sdg}
                      onChange={(e) => setFilters({...filters, sdg: e.target.value})}
                      title='Select SDG'
                    >
                      <option value="">All SDGs</option>
                      {SDG_LIST.map(sdg => (
                        <option key={sdg.value} value={sdg.value}>{sdg.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
                  <button 
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({ year: '', department: '', sdg: '' });
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProjects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-xl text-gray-800 mb-2">{project.title}</h3>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                            {project.year}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-purple-100 text-purple-800">
                            {project.department}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-teal-100 text-teal-800">
                            {SDG_LIST.find(sdg => sdg.value === project.sdg)?.label || `SDG ${project.sdg}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {project.members.slice(0, 5).map((member, index) => (
                              <div 
                                key={index} 
                                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white"
                                title={member.name}
                              >
                                {member.name.charAt(0)}
                              </div>
                            ))}
                            {project.members.length > 5 && (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 border-2 border-white">
                                +{project.members.length - 5}
                              </div>
                            )}
                          </div>
                          <button 
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            onClick={() => setSelectedProject(project)}
                          >
                            View details <FiExternalLink className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Collaborations Tab */}
          {activeTab === 'collaborations' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Collaborations</h2>
              
              {collaborations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">You don't have any collaborations yet</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => setActiveTab('projects')}
                  >
                    Browse available projects
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {collaborations.map(collab => {
                    const project = projects.find(p => p.id === collab.projectId);
                    return (
                      <div key={collab.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-5">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-xl text-gray-800 mb-1">{collab.projectTitle}</h3>
                              <p className="text-gray-600 mb-2">Role: {collab.role}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <span>Started: {new Date(collab.startDate).toLocaleDateString()}</span>
                                {collab.endDate && <span>Ended: {new Date(collab.endDate).toLocaleDateString()}</span>}
                                <span>Commitment: {collab.timeCommitment}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            {project && (
                              <div className="flex -space-x-2">
                                {project.members.slice(0, 5).map((member, index) => (
                                  <div 
                                    key={index} 
                                    className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white"
                                    title={member.name}
                                  >
                                    {member.name.charAt(0)}
                                  </div>
                                ))}
                              </div>
                            )}
                            <button 
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                              onClick={() => {
                                setSelectedProject(project || null);
                                setSelectedCollaboration(collab);
                              }}
                            >
                              View details <FiExternalLink className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Project Resources</h2>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  onClick={() => setShowUploadModal(true)}
                >
                  <FiUpload className="mr-2" /> Upload Resource
                </button>
              </div>
              
              {resources.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500 text-lg mb-4">No resources available yet</p>
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <FiUpload className="mr-2" /> Share your first resource
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resources.map(resource => {
                    const project = projects.find(p => p.id === resource.projectId);
                    return (
                      <div 
                        key={resource.id} 
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedResource(resource)}
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800 mb-1">{resource.title}</h3>
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${
                                resource.type === 'document' ? 'bg-blue-100 text-blue-800' :
                                resource.type === 'link' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {resource.type === 'link' ? (
                                <FiLink className="text-gray-500" />
                              ) : (
                                <FiFile className="text-gray-500" />
                              )}
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-3">
                            <p className="truncate">{resource.description || 'No description provided'}</p>
                            <p className="mt-2">Uploaded by: {resource.uploadedBy}</p>
                            <p>Date: {new Date(resource.uploadDate).toLocaleDateString()}</p>
                            {project && <p>Project: {project.title}</p>}
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <button 
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedResource(resource);
                              }}
                            >
                              View details
                            </button>
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-blue-600 flex items-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {resource.type === 'link' ? 'Visit' : 'Download'} <FiDownload className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upload Resource Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Upload Resource</h2>
                <button 
                  title='Close'
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowUploadModal(false)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <form onSubmit={handleUploadSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title*</label>
                    <input
                      type="text"
                      placeholder="Enter resource title"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resource Type*</label>
                    <select
                      title='Select Resource Type'
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={uploadForm.type}
                      onChange={(e) => setUploadForm({...uploadForm, type: e.target.value as any})}
                    >
                      <option value="document">Document</option>
                      <option value="link">Web Link</option>
                      <option value="file">File</option>
                    </select>
                  </div>
                  
                  {uploadForm.type === 'link' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL*</label>
                      <input
                        type="url"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="https://example.com"
                        value={uploadForm.url}
                        onChange={(e) => setUploadForm({...uploadForm, url: e.target.value})}
                        required={uploadForm.type === 'link'}
                      />
                    </div>
                  )}
                  
                  {uploadForm.type === 'file' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">File*</label>
                      <div 
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center"
                        onClick={handleFileUploadClick}
                      >
                        <FiUpload className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {fileInputRef.current?.files?.[0]?.name || 'Click to select file'}
                        </p>
                        <input
                          type="file"
                          placeholder='Select file'
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setUploadForm({...uploadForm, url: e.target.files[0].name});
                            }
                          }}
                          required={uploadForm.type === 'file'}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Associated Project</label>
                    <select
                      title='Select Project'
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={uploadForm.projectId}
                      onChange={(e) => setUploadForm({...uploadForm, projectId: e.target.value})}
                    >
                      <option value="">None</option>
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      placeholder="Enter resource description"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      rows={3}
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button 
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowUploadModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Upload Resource
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedResource.title}</h2>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    selectedResource.type === 'document' ? 'bg-blue-100 text-blue-800' :
                    selectedResource.type === 'link' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedResource.type.charAt(0).toUpperCase() + selectedResource.type.slice(1)}
                  </span>
                </div>
                <button 
                  title='Close'
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedResource(null)}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {selectedResource.description || 'No description provided.'}
                  </p>
                  
                  {selectedResource.type === 'link' && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">Link</h3>
                      <a 
                        href={selectedResource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        {selectedResource.url}
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Uploaded By</p>
                      <p className="text-gray-800">{selectedResource.uploadedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Upload Date</p>
                      <p className="text-gray-800">
                        {new Date(selectedResource.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    {selectedResource.projectId && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Project</p>
                        <p className="text-gray-800">
                          {projects.find(p => p.id === selectedResource.projectId)?.title || 'Unknown Project'}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-500">Resource Type</p>
                      <p className="text-gray-800 capitalize">{selectedResource.type}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedResource(null)}
                >
                  Close
                </button>
                <a 
                  href={selectedResource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  {selectedResource.type === 'link' ? 'Visit Link' : 'Download'} 
                  <FiExternalLink className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.title}</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  title="Close"
                  onClick={() => {
                  setSelectedProject(null);
                  setSelectedCollaboration(null);
                  }}
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">Project Description</h3>
                  <p className="text-gray-600 whitespace-pre-line">{selectedProject.detailedDescription}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="text-gray-800">{selectedProject.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Department</p>
                      <p className="text-gray-800">{selectedProject.department}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">SDG</p>
                      <p className="text-gray-800">
                        {SDG_LIST.find(sdg => sdg.value === selectedProject.sdg)?.label || `SDG ${selectedProject.sdg}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <p className="text-gray-800 capitalize">{selectedProject.status}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Project Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedProject.members.map((member, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        {member.github && (
                          <a 
                            href={`https://github.com/${member.github}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700"
                            title="GitHub"
                          >
                            <FiGithub />
                          </a>
                        )}
                        {member.linkedin && (
                          <a 
                            href={`https://linkedin.com/in/${member.linkedin}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-700"
                            title="LinkedIn"
                          >
                            <FiLinkedin />
                          </a>
                        )}
                        <a 
                          href={`mailto:${member.email}`} 
                          className="text-gray-500 hover:text-red-600"
                          title="Email"
                        >
                          <FiMail />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedCollaboration && (
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg text-blue-800 mb-2">Your Collaboration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Role</p>
                      <p className="text-blue-900">{selectedCollaboration.role}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Status</p>
                      <p className="text-blue-900 capitalize">{selectedCollaboration.status}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Time Commitment</p>
                      <p className="text-blue-900">{selectedCollaboration.timeCommitment}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedProject(null);
                    setSelectedCollaboration(null);
                  }}
                >
                  Close
                </button>
                {!selectedCollaboration && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Join Project
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}