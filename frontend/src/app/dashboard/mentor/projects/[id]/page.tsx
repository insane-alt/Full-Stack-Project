"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { FiUsers, FiBook, FiCheckCircle, FiMessageSquare, FiClock, FiUser, FiUserPlus, FiMail } from "react-icons/fi";

// Mock data for mentor's projects (structure similar to mentor dashboard)
const mockProjects = [
  {
    id: "1",
    title: "Smart Waste Management System",
    description: "IoT-based solution for efficient waste collection and segregation",
    sdgs: ["11", "12", "13"],
    department: "Computer",
    status: "in progress",
    academicYear: "2023-2024",
    team: [
      { name: "Alex Johnson", role: "Team Leader" },
      { name: "Maria Garcia", role: "Developer" },
      { name: "Sam Wilson", role: "Designer" },
    ],
    facultyMentors: [
      { name: "Professor Smith", department: "Computer" },
      { name: "Dr. Sarah Johnson", department: "AIDS" },
    ],
    collaborations: [
      { name: "GreenTech Solutions", type: "Industry Partner" },
      { name: "City Waste Management", type: "Government Agency" },
    ],
    impact: {
      metrics: [
        { title: "Waste Reduction", value: "40%", description: "Reduction in waste sent to landfills" },
        { title: "Energy Saved", value: "25%", description: "Energy savings through optimized collection" },
      ],
    },
    timeline: [
      { title: "Phase 1", date: "2024-01-15", description: "Initial research and planning." },
      { title: "Phase 2", date: "2024-03-10", description: "Development and testing." },
      { title: "Industrial Visit", date: "2024-04-05", description: "Site visit for real-world insights." },
      { title: "Prototype", date: "2024-05-20", description: "Prototype demonstration and review." },
    ],
  },
  // Add more mock projects as needed
];

const sdgColors = {
  "1": "#E5243B",
  "2": "#DDA63A",
  "3": "#4C9F38",
  "4": "#C5192D",
  "5": "#FF3A21",
  "6": "#26BDE2",
  "7": "#FCC30B",
  "8": "#A21942",
  "9": "#FD6925",
  "10": "#DD1367",
  "11": "#FD9D24",
  "12": "#BF8B2E",
  "13": "#3F7E44",
  "14": "#0A97D9",
  "15": "#56C02B",
  "16": "#00689D",
  "17": "#19486A",
};

export default function MentorProjectDetailPage() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/dashboard/mentor" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">← Back to Projects</Link>
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl shadow-2xl p-10 border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-blue-900 whitespace-nowrap">{project.title}</h1>
          <span className={`px-4 py-1 text-sm font-bold rounded-full border flex items-center h-fit whitespace-nowrap ${
            project.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' :
            project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border-blue-300' :
            'bg-yellow-100 text-yellow-800 border-yellow-300'
          }`}>
            {project.status === 'in-progress'
              ? 'In Progress'
              : project.status.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </span>
        </div>
        <p className="text-gray-700 mb-2">{project.description}</p>
        <div className="mb-4">
          <div className="font-bold text-blue-900 mb-1">Problem Statement</div>
          <div className="text-gray-800 mb-2 text-sm">Urban areas face significant challenges in managing waste efficiently, leading to overflowing landfills, increased pollution, and health hazards due to improper segregation and collection.</div>
          <div className="font-bold text-green-800 mb-1">Solution</div>
          <div className="text-gray-800 text-sm">This project implements an IoT-based Smart Waste Management System that optimizes waste collection routes, enables real-time monitoring of waste bins, and promotes effective segregation at the source, resulting in reduced landfill waste and improved urban cleanliness.</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {project.sdgs.map((sdg) => (
            <span
              key={sdg}
              className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
              style={{ background: sdgColors[sdg as keyof typeof sdgColors], color: '#fff', minWidth: 70, display: 'inline-block', textAlign: 'center' }}
            >
              SDG {sdg}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
          <span className="font-semibold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">{project.department}</span>
          <span className="font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">{project.academicYear}</span>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FiUsers className="text-blue-400" /> Team Members</h2>
          <div className="flex flex-wrap gap-2">
            {project.team.map((member, idx) => (
              <span key={idx} className="bg-blue-100 px-4 py-2 rounded-xl shadow text-blue-900 font-medium flex flex-col items-center min-w-[110px]">
                {member.name} {member.role && <span className="block text-xs text-blue-700 font-semibold">{member.role}</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FiUser className="text-blue-400" /> Faculty Mentors</h2>
            <div className="space-y-2">
              {project.facultyMentors.map((mentor, idx) => (
                <div key={idx} className="bg-blue-50 p-4 rounded-xl flex flex-col shadow border border-blue-100">
                  <span className="font-semibold text-blue-800 text-base">{mentor.name}</span>
                  <span className="block text-xs text-gray-600">{mentor.department}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FiUsers className="text-green-500" /> Collaborations</h2>
            <div className="space-y-2">
              {project.collaborations.map((collab, idx) => (
                <div key={idx} className="bg-green-50 p-4 rounded-xl flex flex-col shadow border border-green-100">
                  <span className="font-semibold text-green-800 text-base">{collab.name}</span>
                  <span className="block text-xs text-gray-600">{collab.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.impact.metrics.map((metric, idx) => (
              <div key={idx} className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-2xl shadow flex flex-col items-start border border-blue-100">
                <h3 className="text-base font-semibold text-blue-800 mb-1">{metric.title}</h3>
                <p className="text-3xl font-extrabold text-green-700 my-1">{metric.value}</p>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Project Timeline Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2"><FiClock className="text-blue-500" /> Project Timeline</h2>
          </div>
          <div className="relative border-l-2 border-blue-200 pl-6">
            {project.timeline.map((item, idx) => (
              <div key={idx} className="mb-8 flex items-start gap-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-900 text-base">{item.title}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{item.date}</span>
                    {idx === 0 && (
                      <button className="ml-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold border border-green-200 cursor-default">Completed</button>
                    )}
                    {idx === 1 && (
                      <button className="ml-2 px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all">Review Now</button>
                    )}
                  </div>
                  {item.description && <div className="text-xs text-gray-500 mt-1">{item.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="https://github.com/example/smart-waste-management"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-800 transition-all"
          >
            GitHub
          </a>
          <a
            href="https://docs.example.com/smart-waste-management"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm border border-blue-200 hover:bg-blue-200 transition-all"
          >
            Upload Documentation
          </a>
          <a
            href={`mailto:${project.team[0]?.name.replace(/ /g, '.').toLowerCase()}@example.com`}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm border border-green-200 hover:bg-green-200 transition-all"
          >
            Contact Leader
          </a>
          <a
            href={`mailto:${project.team[0]?.name.replace(/ /g, '.').toLowerCase()}@example.com?cc=${project.team.slice(1).map(m => m.name.replace(/ /g, '.').toLowerCase() + '@example.com').join(',')}&subject=Mentor Feedback for ${encodeURIComponent(project.title)}`}
            className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-sm border border-yellow-200 hover:bg-yellow-200 transition-all"
          >
            Give Feedback
          </a>
        </div>
      </div>
    </div>
  );
}