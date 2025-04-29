'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Full mockProjects array (copied from main projects page)
const mockProjects = [
  {
    id: 1,
    title: "Smart Waste Management System",
    description: "IoT-based solution for efficient waste collection and segregation",
    sdgs: ["11", "12", "13"],
    department: "Computer",
    status: "Ongoing",
    academicYear: "2024-2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    facultyMentors: [
      { name: "NA", department: "NA" },
    ],
    teamMembers: [
      { name: "Gabbar", role: "Team Leader" },
    ],
    collaborations: [
      { name: "NA", type: "NA" }
    ],
    github: "https://github.com/gabbar-v7/ascent",
    documentation: "https://docs.example.com/smart-waste-management",
    reports: [
      { name: "Final Report", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { name: "Impact Analysis", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
    ],
    insights: [
      { label: "Sensors Deployed", value: 120 },
      { label: "Cities Covered", value: 5 },
      { label: "Tons of Waste Managed", value: 300 }
    ],
    chartData: [
      { name: '2019', Waste: 80 },
      { name: '2020', Waste: 120 },
      { name: '2021', Waste: 200 },
      { name: '2022', Waste: 250 },
      { name: '2023', Waste: 300 }
    ],
    impact: {
      metrics: [
        { title: "Waste Reduction", value: "40%", description: "Reduction in waste sent to landfills" },
        { title: "Energy Saved", value: "25%", description: "Energy savings through optimized collection" }
      ],
      testimonials: [
        { author: "Local Community Member", text: "This project has significantly improved our waste management system." },
        { author: "Industry Expert", text: "Innovative approach to sustainable waste management." }
      ]
    }
  },
  {
    id: 2,
    title: "Solar-Powered Water Purifier",
    description: "Sustainable water purification system for rural communities",
    sdgs: ["6", "7", "3"],
    department: "Mechanical",
    status: "Completed",
    academicYear: "2022-2023",
    facultyMentors: [
      { name: "Dr. Priya Patel", department: "Mechanical" }
    ],
    collaborations: [
      { name: "WaterAid", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Clean Water Provided", value: "5000+", description: "People benefited in rural areas" }
      ],
      testimonials: [
        { author: "Village Leader", text: "Access to clean water has changed our lives." }
      ]
    }
  },
  {
    id: 3,
    title: "Urban Farming Initiative",
    description: "Vertical farming solution for urban food security",
    sdgs: ["2", "11", "12"],
    department: "AIDS",
    status: "Ongoing",
    academicYear: "2023-2024",
    facultyMentors: [
      { name: "Dr. Rakesh Kumar", department: "AIDS" }
    ],
    collaborations: [
      { name: "Urban Greens", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Urban Farms Created", value: "12", description: "New vertical farms in city" }
      ],
      testimonials: [
        { author: "Resident", text: "Fresh produce is now easily available!" }
      ]
    }
  },
  {
    id: 4,
    title: "Smart Energy Grid",
    description: "AI-powered energy distribution for smart cities",
    sdgs: ["7", "9", "11"],
    department: "ECS",
    status: "Ongoing",
    academicYear: "2023-2024",
    facultyMentors: [
      { name: "Dr. Anjali Mehta", department: "ECS" }
    ],
    collaborations: [
      { name: "City Power", type: "Industry Partner" }
    ],
    impact: {
      metrics: [
        { title: "Energy Saved", value: "15%", description: "Reduction in city energy usage" }
      ],
      testimonials: [
        { author: "City Official", text: "The grid is smarter and greener!" }
      ]
    }
  },
  {
    id: 5,
    title: "AI Tutor for Rural Schools",
    description: "AI-driven personalized learning for underprivileged students.",
    sdgs: ["4", "10"],
    department: "Computer",
    status: "Completed",
    academicYear: "2021-2022",
    facultyMentors: [
      { name: "Dr. Suresh Rao", department: "Computer" }
    ],
    collaborations: [
      { name: "EduTech", type: "Industry Partner" }
    ],
    impact: {
      metrics: [
        { title: "Students Reached", value: "2000+", description: "Rural students benefited" }
      ],
      testimonials: [
        { author: "Teacher", text: "The AI tutor is a game changer!" }
      ]
    }
  },
  {
    id: 6,
    title: "Healthcare Chatbot",
    description: "24/7 health advice and triage for remote communities.",
    sdgs: ["3", "9"],
    department: "AIDS",
    status: "Ongoing",
    academicYear: "2024-2025",
    facultyMentors: [
      { name: "Dr. Neha Singh", department: "AIDS" }
    ],
    collaborations: [
      { name: "HealthFirst", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Chats Handled", value: "10,000+", description: "Health queries answered" }
      ],
      testimonials: [
        { author: "User", text: "Got instant help for my symptoms!" }
      ]
    }
  },
  {
    id: 7,
    title: "Green Campus Initiative",
    description: "Reducing campus carbon footprint through smart sensors.",
    sdgs: ["13", "7", "12"],
    department: "ECS",
    status: "Completed",
    academicYear: "2020-2021",
    facultyMentors: [
      { name: "Dr. Kavita Joshi", department: "ECS" }
    ],
    collaborations: [
      { name: "EcoCampus", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "CO2 Reduced", value: "30%", description: "Reduction in campus emissions" }
      ],
      testimonials: [
        { author: "Student", text: "Proud to be part of a green campus!" }
      ]
    }
  },
  {
    id: 8,
    title: "Assistive Tech for Elderly",
    description: "Wearable devices for elderly safety and independence.",
    sdgs: ["3", "9", "10"],
    department: "Mechanical",
    status: "Ongoing",
    academicYear: "2022-2023",
    facultyMentors: [
      { name: "Dr. Manoj Verma", department: "Mechanical" }
    ],
    collaborations: [
      { name: "SilverCare", type: "Industry Partner" }
    ],
    impact: {
      metrics: [
        { title: "Devices Distributed", value: "500+", description: "Elderly people helped" }
      ],
      testimonials: [
        { author: "Elderly User", text: "I feel much safer now!" }
      ]
    }
  },
  {
    id: 9,
    title: "Water Conservation Analytics",
    description: "IoT and analytics for water usage optimization.",
    sdgs: ["6", "12"],
    department: "AIDS",
    status: "Completed",
    academicYear: "2023-2024",
    facultyMentors: [
      { name: "Dr. Ritu Sharma", department: "AIDS" }
    ],
    collaborations: [
      { name: "WaterWise", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Water Saved", value: "1M+ L", description: "Liters of water saved" }
      ],
      testimonials: [
        { author: "City Resident", text: "Our bills are lower and water is saved!" }
      ]
    }
  },
  {
    id: 10,
    title: "Inclusive Education Platform",
    description: "Accessible e-learning for students with disabilities.",
    sdgs: ["4", "10"],
    department: "Computer",
    status: "Ongoing",
    academicYear: "2024-2025",
    facultyMentors: [
      { name: "Dr. Anil Kumar", department: "Computer" }
    ],
    collaborations: [
      { name: "InclusionNow", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Courses Offered", value: "50+", description: "Accessible courses online" }
      ],
      testimonials: [
        { author: "Parent", text: "My child can finally learn at home!" }
      ]
    }
  },
  {
    id: 11,
    title: "Smart Irrigation System",
    description: "Automated irrigation using weather and soil data.",
    sdgs: ["2", "6", "13"],
    department: "Mechanical",
    status: "Ongoing",
    academicYear: "2021-2022",
    facultyMentors: [
      { name: "Dr. S. Iyer", department: "Mechanical" }
    ],
    collaborations: [
      { name: "AgroTech", type: "Industry Partner" }
    ],
    impact: {
      metrics: [
        { title: "Water Usage Reduced", value: "20%", description: "Less water used for crops" }
      ],
      testimonials: [
        { author: "Farmer", text: "My yields are up and costs are down!" }
      ]
    }
  },
  {
    id: 12,
    title: "Disaster Response Drone",
    description: "Drones for rapid disaster assessment and relief.",
    sdgs: ["9", "11", "13"],
    department: "ECS",
    status: "Completed",
    academicYear: "2022-2023",
    facultyMentors: [
      { name: "Dr. P. Nair", department: "ECS" }
    ],
    collaborations: [
      { name: "ReliefOrg", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Missions Flown", value: "30+", description: "Disaster sites covered" }
      ],
      testimonials: [
        { author: "Rescue Worker", text: "Drones helped us save lives!" }
      ]
    }
  },
  {
    id: 13,
    title: "Women Safety App",
    description: "Real-time alerts and safe route suggestions for women.",
    sdgs: ["5", "11", "16"],
    department: "Computer",
    status: "Ongoing",
    academicYear: "2020-2021",
    facultyMentors: [
      { name: "Dr. Meena Gupta", department: "Computer" }
    ],
    collaborations: [
      { name: "SafeWalk", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "Alerts Sent", value: "10,000+", description: "Women helped" }
      ],
      testimonials: [
        { author: "User", text: "I feel safer walking home now." }
      ]
    }
  },
  {
    id: 14,
    title: "Renewable Energy Dashboard",
    description: "Monitoring and optimizing renewable energy sources.",
    sdgs: ["7", "13"],
    department: "ECS",
    status: "Ongoing",
    academicYear: "2024-2025",
    facultyMentors: [
      { name: "Dr. R. Singh", department: "ECS" }
    ],
    collaborations: [
      { name: "GreenPower", type: "Industry Partner" }
    ],
    impact: {
      metrics: [
        { title: "Energy Optimized", value: "500 MW", description: "Renewable energy managed" }
      ],
      testimonials: [
        { author: "Engineer", text: "The dashboard is very insightful!" }
      ]
    }
  },
  {
    id: 15,
    title: "Digital Literacy for All",
    description: "Workshops and resources for digital inclusion.",
    sdgs: ["4", "8", "10"],
    department: "AIDS",
    status: "Completed",
    academicYear: "2021-2022",
    facultyMentors: [
      { name: "Dr. Lata Desai", department: "AIDS" }
    ],
    collaborations: [
      { name: "DigitalIndia", type: "NGO" }
    ],
    impact: {
      metrics: [
        { title: "People Trained", value: "5000+", description: "Individuals digitally empowered" }
      ],
      testimonials: [
        { author: "Participant", text: "I can now use the internet for my business!" }
      ]
    }
  },
];

// SDG color palette (17 colors)
const sdgColors = [
  '#e5243b', '#dda63a', '#4c9f38', '#c5192d', '#ff3a21', '#26bde2', '#fcc30b', '#a21942', '#fd6925', '#dd1367', '#fd9d24', '#bf8b2e', '#3f7e44', '#0a97d9', '#56c02b', '#00689d', '#19486a'
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string, 10);
  const project = mockProjects.find(p => p.id === projectId);

  const [showInterestForm, setShowInterestForm] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(project?.impact?.testimonials || []);
  const [activePdf, setActivePdf] = useState<string | null>(null);

  if (!project) return (
    <div className="py-16 text-center text-2xl text-red-600">Project not found.</div>
  );

  const handleSubmitInterest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInterestForm(false);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { author: "Anonymous User", text: newComment }]);
      setNewComment('');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects" className="text-blue-600 hover:text-blue-800 mb-4 inline-block font-semibold">
          ← Back to Projects
        </Link>
        <div className="bg-white/95 shadow-xl rounded-2xl overflow-hidden border-2 border-blue-100">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h1 className="text-3xl font-extrabold text-blue-900 drop-shadow-sm">{project.title}</h1>
              <span className={`px-4 py-1 text-sm font-bold rounded-full flex items-center gap-1 shadow-sm ${project.status === 'Ongoing'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}>
                {project.status === 'Ongoing' ? (
                  <svg className="w-3 h-3 mr-1 fill-green-500" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
                ) : (
                  <svg className="w-3 h-3 mr-1 fill-blue-500" viewBox="0 0 8 8"><rect width="8" height="8" rx="2" /></svg>
                )}
                {project.status}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-2 font-medium">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
                    style={{ backgroundColor: sdgColors[(parseInt(sdg) - 1) % 17], color: '#fff' }}
                  >
                    SDG {sdg}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 mt-2">
                <span className="font-semibold text-blue-800">{project.department}</span>
                <span className="font-semibold text-green-800">{project.academicYear}</span>
              </div>
            </div>

            {/* Team Members */}
            {project.teamMembers && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-2 text-blue-900">Team Members</h2>
                <div className="flex flex-wrap gap-4">
                  {project.teamMembers.map((member, idx) => (
                    <div key={idx} className="bg-blue-50 px-4 py-2 rounded-lg shadow text-blue-900">
                      <span className="font-semibold">{member.name}</span>
                      {member.role === 'Team Leader' && (
                        <span className="block text-xs text-blue-700">{member.role}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Faculty Mentors & Collaborations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-lg font-bold mb-2 text-blue-900">Faculty Mentors</h2>
                {project.facultyMentors ? (
                  <div className="space-y-3">
                    {project.facultyMentors.map((mentor, idx) => (
                      <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                        <span className="font-semibold text-blue-800">{mentor.name}</span>
                        <span className="block text-xs text-gray-600">{mentor.department}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-gray-400">No mentors listed.</div>}
              </div>
              <div>
                <h2 className="text-lg font-bold mb-2 text-blue-900">Collaborations</h2>
                {project.collaborations ? (
                  <div className="space-y-3">
                    {project.collaborations.map((collab, idx) => (
                      <div key={idx} className="bg-green-50 p-3 rounded-lg">
                        <span className="font-semibold text-green-800">{collab.name}</span>
                        <span className="block text-xs text-gray-600">{collab.type}</span>
                      </div>
                    ))}
                  </div>
                ) : <div className="text-gray-400">No collaborations listed.</div>}
              </div>
            </div>

            {/* Project Impact */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-2 text-blue-900">Project Impact</h2>
              {project.impact?.metrics ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {project.impact.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-100 to-green-100 p-5 rounded-lg">
                      <h3 className="text-base font-semibold text-blue-800">{metric.title}</h3>
                      <p className="text-2xl font-bold text-green-700 my-1">{metric.value}</p>
                      <p className="text-gray-600 text-sm">{metric.description}</p>
                    </div>
                  ))}
                </div>
              ) : <div className="text-gray-400">No impact metrics available.</div>}
            </div>

            {/* Reports & Links */}
            <div className="mb-8 flex flex-wrap gap-2 items-center justify-start">
              {/* Like Button */}
              <button className="inline-flex items-center justify-center min-w-[80px] h-9 px-2 py-1 bg-pink-600 text-white rounded-md shadow hover:bg-pink-700 font-semibold text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-3 h-3 mr-1"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>
                27 Likes
              </button>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[80px] h-9 px-2 py-1 bg-gray-900 text-white rounded-md shadow hover:bg-gray-800 font-semibold text-xs">
                  GitHub
                </a>
              )}
              {project.documentation && (
                <a href={project.documentation} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center min-w-[80px] h-9 px-2 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 font-semibold text-xs">
                  Documentation
                </a>
              )}
              {project.reports && project.reports.length > 0 && (
                <a
                  href={project.reports[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center justify-center min-w-[80px] h-9 px-2 py-1 bg-green-600 text-white rounded-md shadow hover:bg-green-700 font-semibold text-xs"
                >
                  View Final Report
                </a>
              )}
            </div>

            {/* Add Testimonial Form Only */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-2 text-blue-900">Add Testimonial</h2>
              <form onSubmit={handleAddComment} className="mb-8">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add your testimonial..."
                  className="w-full p-3 border rounded-lg mb-2"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Testimonial
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => setShowInterestForm(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-400 text-white px-6 py-3 rounded-lg hover:from-blue-400 hover:to-green-500 font-bold shadow-lg"
              >
                Express Interest in Collaboration
              </button>
            </div>
            {showInterestForm && (
              <div className="fixed inset-0 bg-gray-700 bg-opacity-80 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg max-w-md w-full">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Express Interest</h3>
                  <form onSubmit={handleSubmitInterest}>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-semibold mb-2">Name</label>
                      <input type="text" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-semibold mb-2">Email</label>
                      <input type="email" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-semibold mb-2">LinkedIn (optional)</label>
                      <input type="url" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="https://linkedin.com/in/your-profile" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-semibold mb-2">Interest Type</label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white"
                        style={{ color: '#1a202c', backgroundColor: '#fff' }}
                      >
                        <option style={{ color: '#1a202c', backgroundColor: '#fff' }}>Collaboration</option>
                        <option style={{ color: '#1a202c', backgroundColor: '#fff' }}>Mentoring</option>
                        <option style={{ color: '#1a202c', backgroundColor: '#fff' }}>Partnership</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-800 font-semibold mb-2">Message</label>
                      <textarea className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} required />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowInterestForm(false)}
                        className="px-4 py-2 border border-gray-400 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-400"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 