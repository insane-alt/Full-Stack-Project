'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';

interface Project {
  id: number;
  title: string;
  summary: string;
  description: string;
  teamSize: number;
  projectObjectives: string;
  expectedOutcomes: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  startDate: string;
  endDate: string;
  requiredSkills: string;
  sdgs: string;
  teamMembers: string;
  mentors: string;
  collaborators: string;
  githubLink: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// Map SDG titles to numbers
const sdgMapping: { [key: string]: string } = {
  'No Poverty': '1',
  'Zero Hunger': '2',
  'Good Health and Well-being': '3',
  'Clean Water and Sanitation': '6',
  'Affordable and Clean Energy': '7'
  // Add other SDGs as needed
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const sdgFilter = searchParams.get('sdg');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/students/projects');
        const allProjects = response.data;

        if (sdgFilter) {
          // Filter projects by SDG number
          const filteredProjects = allProjects.filter((project: Project) => {
            const projectSdgNumbers = project.sdgs.split(',').map(sdg => sdgMapping[sdg.trim()]);
            return projectSdgNumbers.includes(sdgFilter);
          });
          setProjects(filteredProjects);
        } else {
          setProjects(allProjects);
        }
        setError('');
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sdgFilter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">
            {sdgFilter ? `SDG ${sdgFilter} Projects` : 'All Projects'}
          </h1>
          {sdgFilter && (
            <Link
              href="/projects"
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              View All Projects
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {sdgFilter
                ? `No projects found for SDG #${sdgFilter}`
                : 'No projects available'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white/95 border-2 border-blue-100 rounded-2xl shadow-xl p-6 flex flex-col"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700">
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{project.summary}</p>

                {project.requiredSkills && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Tech Stack:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.requiredSkills.split(',').map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.sdgs && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">SDGs:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.sdgs.split(',').map((sdg) => (
                        <span
                          key={sdg}
                          className="px-2 py-1 text-white rounded-full text-xs"
                          style={{ backgroundColor: '#666666' }}
                        >
                          {sdg.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto">
                  <div className="text-sm text-gray-600 mb-4">
                    <div>Team Size: {project.teamSize}</div>
                    <div>
                      Duration: {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                    </div>
                  </div>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
                    >
                      View on GitHub →
                    </a>
                  )}

                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}