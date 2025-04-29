'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaUsers, FaChalkboardTeacher, FaHandshake, FaChartBar, FaStar } from 'react-icons/fa';

const mockProjects = [
  {
    id: '1',
    title: 'Smart Waste Management System',
    description: 'IoT-based solution for efficient waste collection and segregation',
    sdgs: ['11', '12', '13'],
    department: 'Computer',
    status: 'Ongoing',
    academicYear: '2023-2024',
    github: 'https://github.com/example/smart-waste-management',
    documentation: 'https://docs.example.com/smart-waste-management',
    chat: 'https://chat.example.com/smart-waste-management',
    teamMembers: [
      { name: 'Alice Brown', role: 'Team Leader' },
      { name: 'Bob Lee' },
      { name: 'Carol White' },
      { name: 'David Green' },
    ],
    facultyMentors: [
      { name: 'Dr. John Smith', department: 'Computer' },
      { name: 'Dr. Sarah Johnson', department: 'AIDS' },
    ],
    collaborations: [
      { name: 'GreenTech Solutions', type: 'Industry Partner' },
      { name: 'City Waste Management', type: 'Government Agency' },
    ],
    impact: {
      metrics: [
        { title: 'Waste Reduction', value: '40%', description: 'Reduction in waste sent to landfills' },
        { title: 'Energy Saved', value: '25%', description: 'Energy savings through optimized collection' },
      ],
    },
  },
  // Add more mock projects as needed
];

// Official SDG colors
const sdgColors: { [key: string]: string } = {
  '1': '#E5243B',
  '2': '#DDA63A',
  '3': '#4C9F38',
  '4': '#C5192D',
  '5': '#FF3A21',
  '6': '#26BDE2',
  '7': '#FCC30B',
  '8': '#A21942',
  '9': '#FD6925',
  '10': '#DD1367',
  '11': '#FD9D24',
  '12': '#BF8B2E',
  '13': '#3F7E44',
  '14': '#0A97D9',
  '15': '#56C02B',
  '16': '#00689D',
  '17': '#19486A',
};

// Mock project timeline data
const projectTimeline = [
  { title: 'Phase 1', date: '2024-01-15', description: 'Initial research and planning.' },
  { title: 'Phase 2', date: '2024-03-10', description: 'Development and testing.' },
  { title: 'Industrial Visit', date: '2024-04-05', description: 'Site visit for real-world insights.' },
  { title: 'Prototype', date: '2024-05-20', description: 'Prototype demonstration and review.' },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = mockProjects.find((p) => p.id === id) || mockProjects[0];
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState({ name: '', rating: 0, comment: '' });
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [timeline, setTimeline] = useState(projectTimeline);
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ title: '', date: '', description: '' });

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/dashboard/student" className="text-blue-600 hover:underline font-semibold mb-4 inline-block">← Back to Projects</Link>
      <div className="bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-3xl shadow-2xl p-10 border border-blue-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-blue-900">{project.title}</h1>
          <span className="px-4 py-1 text-sm font-bold rounded-full bg-green-100 text-green-700 border border-green-300">
            {project.status}
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
              style={{ background: sdgColors[sdg], color: '#fff', minWidth: 70, display: 'inline-block', textAlign: 'center' }}
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
          <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FaUsers className="text-blue-400" /> Team Members</h2>
          <div className="flex flex-wrap gap-2">
            {project.teamMembers.map((member, idx) => (
              <span key={idx} className="bg-blue-100 px-4 py-2 rounded-xl shadow text-blue-900 font-medium flex flex-col items-center min-w-[110px]">
                {member.name} {member.role && <span className="block text-xs text-blue-700 font-semibold">{member.role}</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FaChalkboardTeacher className="text-blue-400" /> Faculty Mentors</h2>
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
            <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FaHandshake className="text-green-500" /> Collaborations</h2>
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
          <h2 className="text-lg font-bold mb-2 text-blue-900 flex items-center gap-2"><FaChartBar className="text-green-500" /> Project Impact</h2>
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
            <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2"><FaChartBar className="text-blue-500" /> Project Timeline</h2>
            <button
              className="inline-flex items-center gap-2 px-4 py-1 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setIsMilestoneOpen(true)}
            >
              + Add Milestone
            </button>
          </div>
          <div className="relative border-l-2 border-blue-200 pl-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="mb-8 flex items-start gap-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full mt-1.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-blue-900 text-base">{item.title}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">{item.date}</span>
                  </div>
                  {item.description && <div className="text-xs text-gray-500 mt-1">{item.description}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Add Milestone Modal */}
        {isMilestoneOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
                onClick={() => setIsMilestoneOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-4 text-center">
                <div className="text-lg font-bold text-blue-700 mb-2">Add Milestone</div>
                <form
                  className="space-y-4"
                  onSubmit={e => {
                    e.preventDefault();
                    setTimeline([...timeline, newMilestone]);
                    setNewMilestone({ title: '', date: '', description: '' });
                    setIsMilestoneOpen(false);
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="Milestone Title"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
                    value={newMilestone.title}
                    onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  />
                  <input
                    type="date"
                    required
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
                    value={newMilestone.date}
                    onChange={e => setNewMilestone({ ...newMilestone, date: e.target.value })}
                  />
                  <textarea
                    required
                    placeholder="Description"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition"
                    rows={3}
                    value={newMilestone.description}
                    onChange={e => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Add Milestone
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 font-semibold text-sm">
              GitHub
            </a>
          )}
          <Link href={`/dashboard/student/projects/${project.id}/documentation`} className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 font-semibold text-sm">
            Documentation
          </Link>
          {project.chat && (
            <button
              type="button"
              onClick={() => setIsChatModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Chat
            </button>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-full shadow hover:bg-yellow-500 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => { setIsFeedbackOpen(true); setFeedbackSuccess(false); }}
          >
            <FaStar className="text-yellow-700" /> Review Feedback
          </button>
        </div>
        {/* Chat Modal */}
        {isChatModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xs w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
                onClick={() => setIsChatModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-4 text-center">
                <div className="text-lg font-bold text-green-700 mb-2">Join the Project Chat!</div>
                <div className="text-sm text-gray-700 mb-2">Connect with the team on WhatsApp or Discord.</div>
                <div className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-600 break-all select-all mb-4">{project.chat}</div>
                <a
                  href={project.chat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-green-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-green-700 transition text-center"
                >
                  Join Chat
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Feedback Modal */}
        {isFeedbackOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
                onClick={() => setIsFeedbackOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
              <div className="mb-4 text-center">
                <div className="text-lg font-bold text-yellow-700 mb-2 flex items-center justify-center gap-2"><FaStar className="text-yellow-500" /> Review Feedback</div>
                {feedbackSuccess ? (
                  <div className="text-green-600 font-semibold text-center text-lg">Thank you for your feedback!</div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={e => {
                      e.preventDefault();
                      setFeedbackSuccess(true);
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500 transition"
                        value={feedback.name}
                        onChange={e => setFeedback({ ...feedback, name: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Rating:</span>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          className={`text-2xl ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'} focus:outline-none`}
                          onClick={() => setFeedback({ ...feedback, rating: star })}
                        >
                          <FaStar />
                        </button>
                      ))}
                    </div>
                    <div>
                      <textarea
                        required
                        placeholder="Your feedback..."
                        className="w-full border-2 border-yellow-200 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500 transition"
                        rows={3}
                        value={feedback.comment}
                        onChange={e => setFeedback({ ...feedback, comment: e.target.value })}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-yellow-900 font-bold py-2 rounded-lg shadow hover:bg-yellow-500 transition"
                    >
                      Submit Feedback
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 