'use client';

import { useState, useEffect } from 'react';
import { FiUsers, FiSearch, FiMessageSquare, FiStar, FiFilter } from 'react-icons/fi';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface User {
  id: string;
  name: string;
  role: string;
  skills: Skill[];
  interests: string[];
  projects: string[];
  availability: 'full-time' | 'part-time' | 'flexible';
  rating: number;
  bio: string;
}

export default function CollaborationHub() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - replace with actual API call
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        role: 'Student',
        skills: [
          { id: '1', name: 'Python', level: 'advanced' },
          { id: '2', name: 'Machine Learning', level: 'intermediate' }
        ],
        interests: ['AI', 'Sustainability', 'Data Science'],
        projects: ['Smart Water Management'],
        availability: 'part-time',
        rating: 4.5,
        bio: 'Passionate about using technology for sustainable development'
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'Student',
        skills: [
          { id: '3', name: 'UI/UX Design', level: 'advanced' },
          { id: '4', name: 'Frontend Development', level: 'intermediate' }
        ],
        interests: ['Web Development', 'Sustainability', 'Design'],
        projects: ['Eco-Friendly E-commerce'],
        availability: 'flexible',
        rating: 4.8,
        bio: 'Design enthusiast focused on creating sustainable digital solutions'
      },
      {
        id: '3',
        name: 'Carlos Rivera',
        role: 'Mentor',
        skills: [
          { id: '5', name: 'Data Science', level: 'advanced' },
          { id: '6', name: 'Python', level: 'advanced' }
        ],
        interests: ['AI', 'Mentorship', 'Education'],
        projects: ['AI for Sustainable Agriculture'],
        availability: 'full-time',
        rating: 4.9,
        bio: 'Experienced data scientist and mentor in AI projects.'
      },
      {
        id: '4',
        name: 'Aisha Khan',
        role: 'Student',
        skills: [
          { id: '7', name: 'Telemedicine', level: 'intermediate' },
          { id: '8', name: 'Node.js', level: 'beginner' }
        ],
        interests: ['Healthcare', 'Technology', 'Sustainability'],
        projects: ['Healthcare Access Platform'],
        availability: 'part-time',
        rating: 4.2,
        bio: 'Aspiring developer interested in healthcare technology.'
      },
      {
        id: '5',
        name: 'Emily Zhang',
        role: 'Student',
        skills: [
          { id: '9', name: 'Content Creation', level: 'advanced' },
          { id: '10', name: 'Web Development', level: 'intermediate' }
        ],
        interests: ['Education', 'Accessibility', 'Design'],
        projects: ['Inclusive Education Portal'],
        availability: 'flexible',
        rating: 4.7,
        bio: 'Content creator and web developer passionate about accessible education.'
      },
      {
        id: '6',
        name: 'Mohammed Al-Farsi',
        role: 'Student',
        skills: [
          { id: '11', name: 'Mobile App', level: 'intermediate' },
          { id: '12', name: 'Crowdsourcing', level: 'beginner' }
        ],
        interests: ['Oceans', 'Sustainability', 'Mobile Development'],
        projects: ['Clean Oceans Initiative'],
        availability: 'full-time',
        rating: 4.3,
        bio: 'Mobile developer working on environmental projects.'
      }
    ];
    setUsers(sampleUsers);
    setIsLoading(false);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkills = selectedSkills.length === 0 || 
                         user.skills.some(skill => selectedSkills.includes(skill.name));
    
    const matchesInterests = selectedInterests.length === 0 || 
                           user.interests.some(interest => selectedInterests.includes(interest));
    
    return matchesSearch && matchesSkills && matchesInterests;
  });

  const allSkills = Array.from(new Set(users.flatMap(user => user.skills.map(skill => skill.name))));
  const allInterests = Array.from(new Set(users.flatMap(user => user.interests)));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-8 border border-pink-100">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-pink-700 tracking-tight">Collaboration Hub</h2>
          <div className="flex items-center space-x-2">
            <FiUsers className="text-pink-400 text-xl" />
            <span className="text-base text-pink-500 font-medium">Find Collaborators</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400 shadow-sm transition-all duration-200 text-gray-900 placeholder-pink-300 bg-white"
            />
            <FiSearch className="absolute left-4 top-3 text-pink-300 text-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-purple-600 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => setSelectedSkills(prev => 
                      prev.includes(skill) 
                        ? prev.filter(s => s !== skill)
                        : [...prev, skill]
                    )}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-100 hover:scale-105 hover:bg-purple-100 ${
                      selectedSkills.includes(skill)
                        ? 'bg-purple-200 text-purple-800 border-purple-300'
                        : 'bg-purple-50 text-purple-700 border-purple-100'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-mint-600 mb-2" style={{color:'#2ec4b6'}}>Interests</label>
              <div className="flex flex-wrap gap-2">
                {allInterests.map(interest => (
                  <button
                    key={interest}
                    onClick={() => setSelectedInterests(prev => 
                      prev.includes(interest)
                        ? prev.filter(i => i !== interest)
                        : [...prev, interest]
                    )}
                    className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-mint-100 hover:scale-105 hover:bg-mint-100 ${
                      selectedInterests.includes(interest)
                        ? 'bg-mint-200 text-mint-800 border-mint-300'
                        : 'bg-mint-50 text-mint-700 border-mint-100'
                    }`}
                    style={selectedInterests.includes(interest) ? {background:'#d0f5ea', color:'#2ec4b6', borderColor:'#a3e4d7'} : {background:'#f0faf7', color:'#2ec4b6', borderColor:'#d0f5ea'}}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-300 mx-auto"></div>
            <p className="mt-4 text-pink-300">Loading collaborators...</p>
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredUsers.map(user => (
              <div key={user.id} className="bg-white rounded-xl shadow p-7 border border-yellow-100 hover:shadow-lg transition-shadow duration-200 group relative overflow-hidden hover:scale-[1.015]" style={{boxShadow:'0 4px 24px 0 #ffe06633'}}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-purple-700 group-hover:text-pink-600 transition-colors duration-200">{user.name}</h3>
                    <p className="text-sm text-pink-400">{user.role}</p>
                  </div>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 text-lg" />
                    <span className="ml-1 text-base text-yellow-600 font-semibold">{user.rating}</span>
                  </div>
                </div>

                <p className="mt-2 text-base text-gray-700">{user.bio}</p>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-purple-600 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map(skill => (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold border border-purple-200 shadow-sm hover:bg-pink-100 hover:text-pink-700 transition-colors duration-150"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-mint-600 mb-2" style={{color:'#2ec4b6'}}>Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full text-xs font-semibold border shadow-sm hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-150"
                        style={{background:'#f0faf7', color:'#2ec4b6', borderColor:'#d0f5ea'}}
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    Availability: <span className="font-semibold text-gray-700">{user.availability}</span>
                  </span>
                  <button className="inline-flex items-center px-5 py-2 border border-mint-300 rounded-lg shadow-sm text-sm font-semibold text-white bg-mint-400 hover:bg-mint-500 focus:ring-2 focus:ring-mint-100 transition-all duration-200 group-hover:scale-105"
                    style={{background:'#2ec4b6', borderColor:'#a3e4d7', color:'#fff'}}>
                    <FiMessageSquare className="mr-2 text-lg" />
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiUsers className="mx-auto h-12 w-12 text-pink-100" />
            <h3 className="mt-2 text-lg font-semibold text-pink-400">No collaborators found</h3>
            <p className="mt-1 text-base text-pink-200">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 