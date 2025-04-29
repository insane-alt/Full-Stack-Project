import { useState } from 'react';
import { FiSearch, FiFilter, FiX, FiStar, FiUsers } from 'react-icons/fi';

interface Project {
  id: string;
  title: string;
  description: string;
  sdgs: number[];
  skills: string[];
  teamSize: number;
  currentMembers: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
}

export default function ProjectSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSDGs, setSelectedSDGs] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced sample projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Smart Water Management System',
      description: 'Developing an IoT-based system for efficient water usage in urban areas',
      sdgs: [6, 11],
      skills: ['IoT', 'Python', 'Data Analysis'],
      teamSize: 4,
      currentMembers: 2,
      status: 'open',
      createdAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'AI for Sustainable Agriculture',
      description: 'Using machine learning to optimize crop yields and reduce water usage',
      sdgs: [2, 9],
      skills: ['Machine Learning', 'Python', 'Agriculture'],
      teamSize: 5,
      currentMembers: 3,
      status: 'in-progress',
      createdAt: '2024-03-10'
    },
    {
      id: '3',
      title: 'Renewable Energy Dashboard',
      description: 'A dashboard to monitor and analyze renewable energy production in real-time',
      sdgs: [7, 9, 11],
      skills: ['React', 'Data Visualization', 'APIs'],
      teamSize: 6,
      currentMembers: 4,
      status: 'completed',
      createdAt: '2024-02-20'
    },
    {
      id: '4',
      title: 'Healthcare Access Platform',
      description: 'Connecting rural communities to healthcare providers using telemedicine',
      sdgs: [3, 9],
      skills: ['Telemedicine', 'Node.js', 'UX Design'],
      teamSize: 5,
      currentMembers: 5,
      status: 'open',
      createdAt: '2024-03-18'
    },
    {
      id: '5',
      title: 'Clean Oceans Initiative',
      description: 'Crowdsourcing data to track and reduce ocean plastic pollution',
      sdgs: [14, 6],
      skills: ['Crowdsourcing', 'Mobile App', 'Data Science'],
      teamSize: 8,
      currentMembers: 6,
      status: 'in-progress',
      createdAt: '2024-03-12'
    },
    {
      id: '6',
      title: 'Inclusive Education Portal',
      description: 'A platform to provide accessible learning resources for all abilities',
      sdgs: [4, 10],
      skills: ['Accessibility', 'Web Development', 'Content Creation'],
      teamSize: 7,
      currentMembers: 2,
      status: 'open',
      createdAt: '2024-03-19'
    }
  ];

  const allSkills = Array.from(new Set(projects.flatMap(p => p.skills)));
  const allSDGs = Array.from(new Set(projects.flatMap(p => p.sdgs)));

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSDGs = selectedSDGs.length === 0 ||
                       project.sdgs.some(sdg => selectedSDGs.includes(sdg));
    const matchesSkills = selectedSkills.length === 0 ||
                         project.skills.some(skill => selectedSkills.includes(skill));
    return matchesSearch && matchesSDGs && matchesSkills;
  });

  const toggleSDG = (sdg: number) => {
    setSelectedSDGs(prev =>
      prev.includes(sdg)
        ? prev.filter(s => s !== sdg)
        : [...prev, sdg]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSDGs([]);
    setSelectedSkills([]);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition-all duration-200"
          />
          <FiSearch className="absolute left-4 top-3 text-gray-400 text-lg" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-5 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-blue-50 transition-all duration-200"
        >
          <FiFilter className="mr-2 text-lg" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center"><FiFilter className="mr-2" /> Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-500 underline"
            >
              Clear all
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">SDGs</h4>
              <div className="flex flex-wrap gap-2">
                {allSDGs.map(sdg => (
                  <button
                    key={sdg}
                    onClick={() => toggleSDG(sdg)}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      selectedSDGs.includes(sdg)
                        ? 'bg-blue-600 text-white border-blue-600 scale-105'
                        : 'bg-gray-100 text-blue-700 border-blue-200 hover:bg-blue-50'
                    }`}
                  >
                    SDG {sdg}
                  </button>
                ))}
              </div>
            </div>
            {/* Uncomment to add skills filter
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      selectedSkills.includes(skill)
                        ? 'bg-green-600 text-white border-green-600 scale-105'
                        : 'bg-gray-100 text-green-700 border-green-200 hover:bg-green-50'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
            */}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredProjects.map(project => (
          <div
            key={project.id}
            className="bg-white p-7 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 group relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{project.description}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.sdgs.map(sdg => (
                <span
                  key={sdg}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100 shadow-sm"
                >
                  SDG {sdg}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-sm text-gray-500">
                  <FiUsers className="mr-1.5 text-lg" />
                  {project.currentMembers}/{project.teamSize} members
                </div>
                <div className="text-sm text-gray-400">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
              <button className="inline-flex items-center px-5 py-2 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-all duration-200 group-hover:scale-105">
                <FiStar className="mr-2 text-lg" />
                Join Project
              </button>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <img src="https://undraw.co/api/illustrations/empty?color=blue" alt="No projects" className="w-40 h-40 mb-4 opacity-80" />
            <p className="text-gray-500 text-lg font-medium">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
} 