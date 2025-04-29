'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axiosInstance from '@/api/axiosInstance';

interface Project {
  id: number;
  title: string;
  sdgs: string;
  // ... other fields
}

const sdgsData = [
  {
    id: 1,
    title: "No Poverty",
    color: "bg-red-500",
    description: "End poverty in all its forms everywhere",
    projectCount: 12,
    icon: "/sdg-icons/sdg1.png"
  },
  {
    id: 2,
    title: "Zero Hunger",
    color: "bg-yellow-500",
    description: "End hunger, achieve food security and improved nutrition",
    projectCount: 8,
    icon: "/sdg-icons/sdg2.png"
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    color: "bg-green-500",
    description: "Ensure healthy lives and promote well-being for all",
    projectCount: 15,
    icon: "/sdg-icons/sdg3.png"
  },
  {
    id: 4,
    title: "Quality Education",
    color: "bg-red-600",
    description: "Ensure inclusive and equitable quality education",
    projectCount: 20,
    icon: "/sdg-icons/sdg4.png"
  },
  {
    id: 5,
    title: "Gender Equality",
    color: "bg-orange-500",
    description: "Achieve gender equality and empower all women and girls",
    projectCount: 10,
    icon: "/sdg-icons/sdg5.png"
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    color: "bg-blue-500",
    description: "Ensure availability and sustainable management of water",
    projectCount: 7,
    icon: "/sdg-icons/sdg6.png"
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    color: "bg-yellow-400",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all",
    projectCount: 9,
    icon: "/sdg-icons/sdg7.png"
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    color: "bg-pink-600",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all",
    projectCount: 11,
    icon: "/sdg-icons/sdg8.png"
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    color: "bg-red-700",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation",
    projectCount: 13,
    icon: "/sdg-icons/sdg9.png"
  },
  {
    id: 10,
    title: "Reduced Inequalities",
    color: "bg-pink-400",
    description: "Reduce inequality within and among countries",
    projectCount: 6,
    icon: "/sdg-icons/sdg10.png"
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    color: "bg-yellow-600",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable",
    projectCount: 14,
    icon: "/sdg-icons/sdg11.png"
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    color: "bg-yellow-700",
    description: "Ensure sustainable consumption and production patterns",
    projectCount: 8,
    icon: "/sdg-icons/sdg12.png"
  },
  {
    id: 13,
    title: "Climate Action",
    color: "bg-green-700",
    description: "Take urgent action to combat climate change and its impacts",
    projectCount: 10,
    icon: "/sdg-icons/sdg13.png"
  },
  {
    id: 14,
    title: "Life Below Water",
    color: "bg-blue-400",
    description: "Conserve and sustainably use the oceans, seas and marine resources",
    projectCount: 5,
    icon: "/sdg-icons/sdg14.png"
  },
  {
    id: 15,
    title: "Life on Land",
    color: "bg-green-800",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems",
    projectCount: 7,
    icon: "/sdg-icons/sdg15.png"
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    color: "bg-blue-900",
    description: "Promote peaceful and inclusive societies for sustainable development",
    projectCount: 6,
    icon: "/sdg-icons/sdg16.png"
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    color: "bg-indigo-700",
    description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development",
    projectCount: 9,
    icon: "/sdg-icons/sdg17.png"
  },
];

export default function SDGsPage() {
  const [sdgs, setSdgs] = useState(sdgsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/students/projects');
        const projects: Project[] = response.data;

        // Create a map to count projects per SDG
        const sdgCounts = new Map<string, number>();

        // Count projects for each SDG
        projects.forEach(project => {
          const projectSdgs = project.sdgs.split(',');
          projectSdgs.forEach(sdg => {
            const trimmedSdg = sdg.trim();
            sdgCounts.set(trimmedSdg, (sdgCounts.get(trimmedSdg) || 0) + 1);
          });
        });

        // Update SDGs with actual project counts
        const updatedSdgs = sdgsData.map(sdg => ({
          ...sdg,
          projectCount: sdgCounts.get(sdg.title) || 0
        }));

        setSdgs(updatedSdgs);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sustainable Development Goals</h1>
          <p className="text-lg text-gray-600">
            Explore projects aligned with the United Nations Sustainable Development Goals
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sdgs.map((sdg) => (
            <Link
              key={sdg.id}
              href={`/projects?sdg=${sdg.id}`}
              className="group block h-full"
            >
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(31, 41, 55, 0.15)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white border border-gray-200/80 overflow-hidden rounded-xl h-full flex flex-col transition-all"
              >
                <div className={`h-2 ${sdg.color}`} />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img src={sdg.icon} alt={`SDG ${sdg.id} icon`} className="w-20 h-20 object-contain" />
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                        {sdg.title}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      SDG {sdg.id}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-1">{sdg.description}</p>
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <span className="text-sm text-gray-500">
                      {sdg.projectCount} Projects
                    </span>
                    <span className="bg-gray-100 text-blue-600 px-2 py-0.5 rounded-md font-semibold shadow-sm transition-colors cursor-pointer border border-transparent hover:bg-gray-200 hover:border-blue-400 text-xs align-middle">
                      View Projects →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}