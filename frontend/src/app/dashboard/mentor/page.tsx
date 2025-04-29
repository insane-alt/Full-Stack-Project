'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiBook, FiBarChart2, FiCheckCircle, 
  FiMessageSquare, FiCalendar, FiFileText, 
  FiAward, FiHome, FiSettings, FiSearch, FiMail, 
  FiUser, FiClock, FiEdit2, FiPlus, FiSend,
  FiUserPlus, FiChevronRight, FiPhone, FiBell
} from 'react-icons/fi';

// Types
type Project = {
  id: number;
  title: string;
  description: string;
  sdgs: string[];
  team: { id: number; name: string; email: string; role: string }[];
  progress: number;
  deadlines: { id: number; title: string; date: string; completed: boolean }[];
  summary: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
};

type Expert = {
  id: number;
  name: string;
  expertise: string[];
  organization: string;
  email: string;
  phone?: string;
};

type Comment = {
  id: number;
  author: string;
  text: string;
  date: string;
};

type Mentee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  project: string;
  joinDate: string;
  skills: string[];
  college: string;
  department: string;
  profilePic?: string;
};

// Mock Data
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Smart Waste Management System",
    description: "IoT-based solution for efficient waste collection and segregation",
    sdgs: ["11", "12", "13"],
    team: [
      { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Team Leader" },
      { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "Developer" },
      { id: 3, name: "Sam Wilson", email: "sam@example.com", role: "Designer" },
    ],
    progress: 50,
    deadlines: [
      { id: 1, title: "Initial Prototype", date: "2024-06-15", completed: true },
      { id: 2, title: "Testing Phase", date: "2024-07-20", completed: false },
      { id: 3, title: "Final Submission", date: "2024-08-30", completed: false },
    ],
    summary: "Developing a smart bin system that uses sensors to optimize waste collection routes and reduce operational costs.",
    status: "in-progress"
  },
  {
    id: 2,
    title: "Urban Green Spaces Mapping",
    description: "AI-powered platform to identify and map urban green spaces",
    sdgs: ["11", "15"],
    team: [
      { id: 1, name: "Jordan Lee", email: "jordan@example.com", role: "Team Leader" },
      { id: 2, name: "Taylor Smith", email: "taylor@example.com", role: "Data Scientist" },
    ],
    progress: 75,
    deadlines: [
      { id: 1, title: "Data Collection", date: "2024-05-10", completed: true },
      { id: 2, title: "Model Training", date: "2024-06-25", completed: true },
      { id: 3, title: "Platform Beta", date: "2024-07-15", completed: false },
    ],
    summary: "Creating an open-source tool for cities to monitor and plan urban green spaces using satellite imagery and machine learning.",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Renewable Energy Education Kit",
    description: "Hands-on STEM kit for teaching renewable energy concepts",
    sdgs: ["4", "7"],
    team: [
      { id: 1, name: "Casey Kim", email: "casey@example.com", role: "Team Leader" },
      { id: 2, name: "Morgan Patel", email: "morgan@example.com", role: "Engineer" },
      { id: 3, name: "Jamie Wong", email: "jamie@example.com", role: "Educator" },
    ],
    progress: 25,
    deadlines: [
      { id: 1, title: "Curriculum Design", date: "2024-06-01", completed: false },
      { id: 2, title: "Prototype Development", date: "2024-07-10", completed: false },
    ],
    summary: "Developing affordable educational kits to teach students about solar, wind, and hydroelectric power through hands-on experiments.",
    status: "planning"
  }
];

const mockExperts: Expert[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    expertise: ["IoT", "Waste Management", "Circular Economy"],
    organization: "GreenTech Solutions",
    email: "s.chen@greentech.com",
    phone: "+1 (555) 987-6543"
  },
  {
    id: 2,
    name: "Prof. James Wilson",
    expertise: ["Renewable Energy", "Urban Planning", "Policy"],
    organization: "University of Tech",
    email: "j.wilson@utech.edu",
    phone: "+1 (555) 123-4567"
  },
  {
    id: 3,
    name: "Dr. Aisha Mohammed",
    expertise: ["AI", "Remote Sensing", "Environmental Science"],
    organization: "Global Earth Observatory",
    email: "a.mohammed@geo.org"
  },
  {
    id: 4,
    name: "Dr. Carlos Mendez",
    expertise: ["STEM Education", "Renewable Energy", "Product Design"],
    organization: "Future Innovators Lab",
    email: "c.mendez@futureinnovators.org",
    phone: "+1 (555) 456-7890"
  },
  {
    id: 5,
    name: "Dr. Emily Zhang",
    expertise: ["Climate Change", "Sustainability", "Policy"],
    organization: "EcoPolicy Institute",
    email: "e.zhang@ecopolicy.org",
    phone: "+1 (555) 234-5678"
  },
  {
    id: 6,
    name: "Prof. Omar Farouk",
    expertise: ["Water Management", "Civil Engineering", "GIS"],
    organization: "Cairo University",
    email: "o.farouk@cairo.edu",
    phone: "+20 2 1234 5678"
  },
  {
    id: 7,
    name: "Dr. Isabella Rossi",
    expertise: ["Urban Design", "Architecture", "Green Buildings"],
    organization: "Politecnico di Milano",
    email: "i.rossi@polimi.it"
  },
  {
    id: 8,
    name: "Dr. Lucas Martins",
    expertise: ["Renewable Energy", "Wind Power", "Project Management"],
    organization: "Brazil Energy Research Center",
    email: "l.martins@berc.br",
    phone: "+55 11 98765-4321"
  }
];

const mockMentees: Mentee[] = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      project: "Smart Waste Management System",
      joinDate: "2024-01-15",
      skills: ["IoT", "Python", "Data Analysis"],
      college: "Indian Institute of Technology",
      department: "Computer Science"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 8765432109",
      project: "Urban Green Spaces Mapping",
      joinDate: "2024-02-20",
      skills: ["Machine Learning", "GIS", "Python"],
      college: "National Institute of Technology",
      department: "Environmental Engineering"
  },
  {
    id: 3,
    name: "Anjali Verma",
    email: "anjali@example.com",
    phone: "+91 9123456780",
    project: "Renewable Energy Education Kit",
    joinDate: "2024-03-10",
    skills: ["STEM", "Renewable Energy", "Teaching"],
    college: "Delhi University",
    department: "Physics"
  },
  {
    id: 4,
    name: "Siddharth Mehra",
    email: "siddharth@example.com",
    phone: "+91 9988776655",
    project: "Smart Waste Management System",
    joinDate: "2024-04-05",
    skills: ["IoT", "Hardware", "C++"],
    college: "BITS Pilani",
    department: "Electronics"
  },
  {
    id: 5,
    name: "Fatima Noor",
    email: "fatima@example.com",
    phone: "+91 8877665544",
    project: "Urban Green Spaces Mapping",
    joinDate: "2024-05-12",
    skills: ["GIS", "Remote Sensing", "AI"],
    college: "Jamia Millia Islamia",
    department: "Geography"
  },
  {
    id: 6,
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 9001122334",
    project: "Smart Waste Management System",
    joinDate: "2024-06-01",
    skills: ["Sensors", "JavaScript", "Logistics"],
    college: "IIT Kanpur",
    department: "Mechanical Engineering"
  },
  {
    id: 7,
    name: "Meera Nair",
    email: "meera@example.com",
    phone: "+91 9112233445",
    project: "Renewable Energy Education Kit",
    joinDate: "2024-06-10",
    skills: ["Education", "Solar Energy", "Arduino"],
    college: "Anna University",
    department: "Electrical Engineering"
  },
  {
    id: 8,
    name: "Arjun Desai",
    email: "arjun@example.com",
    phone: "+91 9223344556",
    project: "Urban Green Spaces Mapping",
    joinDate: "2024-06-15",
    skills: ["Mapping", "Python", "Data Visualization"],
    college: "Mumbai University",
    department: "Civil Engineering"
  }
];

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [projects, setProjects] = useState(mockProjects);
  const [newDeadline, setNewDeadline] = useState({
    title: '',
    date: '',
    notes: ''
  });
  const [mentees, setMentees] = useState<Mentee[]>(mockMentees);
  const [newMentee, setNewMentee] = useState<Omit<Mentee, 'id'>>({
    name: '',
    email: '',
    phone: '',
    project: '',
    joinDate: new Date().toISOString().split('T')[0],
    skills: [],
    college: '',
    department: ''
  });
  const [currentSkill, setCurrentSkill] = useState('');

  // Navigation items
  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'projects', label: 'Project Management', icon: FiBook },
    { id: 'mentees', label: 'Mentee Profiles', icon: FiUser },
    { id: 'add-mentees', label: 'Add Mentees', icon: FiUserPlus },
    { id: 'experts', label: 'Expert Network', icon: FiUsers },
  ];

  // Calculate project progress based on completed deadlines
  const calculateProgress = (project: Project) => {
    if (project.deadlines.length === 0) return 0;
    const completedCount = project.deadlines.filter(d => d.completed).length;
    return Math.round((completedCount / project.deadlines.length) * 100);
  };

  // Progress tracker component
  const ProgressTracker = ({ progress }: { progress: number }) => {
    const progressSteps = [25, 50, 75, 100];
    const normalizedProgress = Math.min(100, Math.max(0, Math.round(progress / 25) * 25));
    
    return (
      <div className="mt-4">
        <div className="flex justify-between mb-2 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-0" style={{ top: '8px' }}></div>
          {progressSteps.map(step => (
            <motion.div
              key={step}
              whileHover={{ scale: 1.15, boxShadow: '0 0 8px #38bdf8' }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold relative z-10 transition-colors duration-300 group ${
                progress >= step 
                  ? 'bg-gradient-to-br from-teal-400 via-blue-400 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 border border-gray-300'
              }`}
              aria-label={`Progress ${step}%${progress >= step ? ' (completed)' : ''}`}
              tabIndex={0}
            >
              <span className="sr-only">{step}% step</span>
              <span>{step}%</span>
              <span className="absolute left-1/2 -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 pointer-events-none bg-gray-900 text-white text-xs rounded px-2 py-1 transition-opacity duration-200 whitespace-nowrap z-20">
                {step === 25 && 'Getting started!'}
                {step === 50 && 'Halfway there!'}
                {step === 75 && 'Almost done!'}
                {step === 100 && 'Completed!'}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4 overflow-hidden">
          <motion.div
            className="h-2 rounded-full bg-gradient-to-r from-teal-400 via-blue-400 to-blue-600 shadow-md"
            initial={{ width: 0 }}
            animate={{ width: `${normalizedProgress}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            aria-valuenow={normalizedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>
      </div>
    );
  };

  // Project Card component
  const ProjectCard = ({ project }: { project: Project }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100 hover:shadow-lg transition-shadow"
      onClick={() => setSelectedProject(project)}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
            project.status === 'completed' ? 'bg-green-100 text-green-800' :
            project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        <p className="mt-2 text-gray-600">{project.description}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {project.sdgs.map(sdg => (
            <span 
              key={sdg} 
              className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
            >
              SDG {sdg}
            </span>
          ))}
        </div>
        
        <ProgressTracker progress={project.progress} />
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map(member => (
              <div 
                key={member.id} 
                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-800 border-2 border-white"
                title={member.name}
              >
                {member.name.charAt(0)}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border-2 border-white">
                +{project.team.length - 3}
              </div>
            )}
          </div>
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `mailto:${project.team.find(m => m.role === 'Team Leader')?.email}`;
            }}
          >
            <FiMail className="mr-1" /> Contact Leader
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Add Mentee Section
  const AddMentees = () => {
    const handleAddMentee = () => {
      if (newMentee.name && newMentee.email && newMentee.project) {
        const mentee: Mentee = {
          id: mentees.length + 1,
          ...newMentee
        };
        setMentees([...mentees, mentee]);
        setNewMentee({
          name: '',
          email: '',
          phone: '',
          project: '',
          joinDate: new Date().toISOString().split('T')[0],
          skills: [],
          college: '',
          department: ''
        });
        setActiveTab('mentees'); // Switch to mentee profiles after adding
      }
    };

    const addSkill = () => {
      if (currentSkill && !newMentee.skills.includes(currentSkill)) {
        setNewMentee({
          ...newMentee,
          skills: [...newMentee.skills, currentSkill]
        });
        setCurrentSkill('');
      }
    };

    const removeSkill = (skill: string) => {
      setNewMentee({
        ...newMentee,
        skills: newMentee.skills.filter(s => s !== skill)
      });
    };

    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Mentee</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.name}
              onChange={(e) => setNewMentee({...newMentee, name: e.target.value})}
              placeholder="Enter mentee's full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.email}
              onChange={(e) => setNewMentee({...newMentee, email: e.target.value})}
              placeholder="Enter mentee's email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.phone}
              onChange={(e) => setNewMentee({...newMentee, phone: e.target.value})}
              placeholder="Enter mentee's phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.college}
              onChange={(e) => setNewMentee({...newMentee, college: e.target.value})}
              placeholder="Enter college/university name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.department}
              onChange={(e) => setNewMentee({...newMentee, department: e.target.value})}
              placeholder="Enter department"
            />
          </div>
          
          <div>
            <label htmlFor="assignedProject" className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Project
            </label>
            <select
              id="assignedProject"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.project}
              onChange={(e) => setNewMentee({ ...newMentee, project: e.target.value })}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.title}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={newMentee.joinDate}
              onChange={(e) => setNewMentee({...newMentee, joinDate: e.target.value})}
              placeholder='Select join date'
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newMentee.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center"
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center transition-all"
          onClick={handleAddMentee}
          disabled={!newMentee.name || !newMentee.email || !newMentee.project || !newMentee.college || !newMentee.department}
        >
          <FiUserPlus className="mr-2" /> Add Mentee
        </button>
      </div>
    );
  };

  // Mentee Profile Section
  const MenteeProfiles = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Mentee Profiles</h2>
        
        {selectedMentee ? (
          <div className="bg-white rounded-xl shadow-md p-6">
            <button 
              onClick={() => setSelectedMentee(null)}
              className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <FiChevronRight className="rotate-180 mr-1" /> Back to list
            </button>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl font-bold text-blue-800">
                  {selectedMentee.name.charAt(0)}
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedMentee.name}</h3>
                <p className="text-gray-600 mb-4">{selectedMentee.college} • {selectedMentee.department}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-gray-800">{selectedMentee.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p className="text-gray-800">{selectedMentee.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Project</h4>
                    <p className="text-gray-800">{selectedMentee.project}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Join Date</h4>
                    <p className="text-gray-800">{new Date(selectedMentee.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentee.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentees.map(mentee => (
              <div 
                key={mentee.id} 
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedMentee(mentee)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xl font-bold text-blue-800">
                    {mentee.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{mentee.name}</h3>
                    <p className="text-gray-600 text-sm">{mentee.college}</p>
                    <p className="text-gray-500 text-sm">{mentee.department}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Project</span>
                    <span className="text-sm text-gray-800">{mentee.project}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium text-gray-500">Joined</span>
                    <span className="text-sm text-gray-800">{new Date(mentee.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentee.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                  {mentee.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      +{mentee.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Project Details Modal
  const ProjectDetails = ({ project, onClose }: { project: Project, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close project details"
              >
                ✕
              </button>
            </div>
            
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'team' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('team')}
              >
                Team
              </button>
              <button
                className={`px-4 py-2 font-medium transition-colors ${activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                onClick={() => setActiveTab('comments')}
              >
                Comments
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Project Summary</h3>
                  <p className="text-gray-700">{project.summary}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">SDGs Addressed</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.sdgs.map(sdg => (
                      <span 
                        key={sdg} 
                        className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium"
                      >
                        SDG {sdg}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Progress</h3>
                  <ProgressTracker progress={project.progress} />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upcoming Deadlines</h3>
                  <div className="space-y-2">
                    {project.deadlines.filter(d => !d.completed).map(deadline => (
                      <div key={deadline.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <FiClock className="text-gray-500 mr-3" />
                        <div className="flex-1">
                          <p className="font-medium">{deadline.title}</p>
                          <p className="text-sm text-gray-500">Due: {new Date(deadline.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                <div className="space-y-3">
                  {project.team.map(member => (
                    <div key={member.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-3 font-bold text-blue-800">
                        {member.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <a 
                        href={`mailto:${member.email}`}
                        className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <FiMail />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'comments' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Feedback & Comments</h3>
                
                <div className="mb-6 space-y-4">
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <div key={comment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium">{comment.author}</p>
                          <p className="text-sm text-gray-500">{comment.date}</p>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No comments yet</p>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-md font-medium mb-3">Add Comment</h4>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    rows={3}
                    placeholder="Enter your feedback..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center transition-all"
                      onClick={() => {
                        if (newComment.trim()) {
                          setComments([...comments, {
                            id: comments.length + 1,
                            author: "Mentor",
                            text: newComment,
                            date: new Date().toLocaleDateString()
                          }]);
                          setNewComment('');
                        }
                      }}
                    >
                      <FiSend className="mr-2" /> Post Comment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  // Project Management Section
  const ProjectManagement = () => {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    
    const handleDeadlineToggle = (projectId: number, deadlineId: number) => {
      const updatedProjects = projects.map(p => {
        if (p.id === projectId) {
          const updatedDeadlines = p.deadlines.map(d => 
            d.id === deadlineId ? {...d, completed: !d.completed} : d
          );
          const newProgress = calculateProgress({...p, deadlines: updatedDeadlines});
          return {...p, deadlines: updatedDeadlines, progress: newProgress};
        }
        return p;
      });
      setProjects(updatedProjects);
    };

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FiBook className="text-green-400" /> Active Projects
          </h2>
          <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg text-white rounded-xl font-bold text-base hover:from-blue-700 hover:to-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FiPlus className="text-lg" /> Add Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {projects.map(project => (
            <div 
              key={project.id} 
              className={`p-6 rounded-xl border transition-all ${activeProject?.id === project.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:shadow-md'}`}
              onClick={() => setActiveProject(project)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {project.team.slice(0, 3).map(member => (
                    <div key={member.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-800 border-2 border-white" title={member.name}>
                      {member.name.charAt(0)}
                    </div>
                  ))}
                  {project.team.length > 3 && (
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border-2 border-white">
                      +{project.team.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-700 font-semibold ml-2">Progress:</span>
                  <div className="flex-1 min-w-[120px]">
              <ProgressTracker progress={project.progress} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {activeProject && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-2xl font-extrabold text-blue-900 mb-4 flex items-center gap-2">
              <FiCalendar className="text-blue-500" /> Manage Deadlines for <span className="ml-2">{activeProject.title}</span>
            </h3>
            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FiClock className="text-yellow-500" /> Current Deadlines
              </h4>
              <div className="space-y-3">
                {activeProject.deadlines.map(deadline => (
                  <div
                    key={deadline.id}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-colors shadow-sm ${
                      deadline.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div>
                      <div className={`font-bold text-base mb-1 flex items-center gap-2 ${deadline.completed ? 'text-green-800' : 'text-yellow-800'}`}>
                        {deadline.completed ? <FiCheckCircle className="text-green-500" /> : <FiClock className="text-yellow-500" />} {deadline.title}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 font-semibold flex items-center gap-1">
                          <FiCalendar className="text-blue-400" /> Due: {new Date(deadline.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ml-2 ${
                          deadline.completed ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        }`}>
                          {deadline.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      title={deadline.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      onClick={e => {
                        e.stopPropagation();
                        handleDeadlineToggle(activeProject.id, deadline.id);
                      }}
                    >
                      <FiCheckCircle className={deadline.completed ? 'text-green-500' : 'text-gray-400'} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FiPlus className="text-blue-500" /> Add New Deadline
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label htmlFor="deadline-title" className="block text-sm font-semibold text-gray-700 mb-1">
                    Deadline Title
                  </label>
                  <input
                    type="text"
                    id="deadline-title"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newDeadline.title}
                    onChange={e => setNewDeadline({ ...newDeadline, title: e.target.value })}
                    placeholder="Enter the deadline title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newDeadline.date}
                    onChange={e => setNewDeadline({ ...newDeadline, date: e.target.value })}
                    placeholder="Select a date"
                  />
                </div>
                <div>
                  <label htmlFor="deadline-notes" className="block text-sm font-semibold text-gray-700 mb-1">
                    Notes
                  </label>
                  <input
                    type="text"
                    id="deadline-notes"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={newDeadline.notes}
                    onChange={e => setNewDeadline({ ...newDeadline, notes: e.target.value })}
                    placeholder="Enter additional notes"
                  />
                </div>
              </div>
              <button
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 flex items-center transition-all font-bold text-base"
                onClick={() => {
                  if (newDeadline.title && newDeadline.date) {
                    const updatedProjects = projects.map(p => {
                      if (p.id === activeProject.id) {
                        const newDeadlines = [
                          ...p.deadlines,
                          {
                            id: p.deadlines.length + 1,
                            title: newDeadline.title,
                            date: newDeadline.date,
                            completed: false
                          }
                        ];
                        const newProgress = calculateProgress({ ...p, deadlines: newDeadlines });
                        return {
                          ...p,
                          deadlines: newDeadlines,
                          progress: newProgress
                        };
                      }
                      return p;
                    });
                    setProjects(updatedProjects);
                    setNewDeadline({ title: '', date: '', notes: '' });
                  }
                }}
              >
                <FiPlus className="mr-2" /> Add Deadline
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Expert Network Section
  const ExpertNetwork = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredExperts = mockExperts.filter(expert =>
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return (
      <div>
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search experts by name or expertise..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperts.map(expert => (
            <div key={expert.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 mr-4">
                  <FiUser className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{expert.name}</h3>
                  <p className="text-gray-600">{expert.organization}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {expert.expertise.map(skill => (
                      <span key={skill} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a 
                      href={`mailto:${expert.email}`}
                      className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm flex items-center hover:from-blue-700 hover:to-blue-800 transition-all"
                    >
                      <FiMail className="mr-2" /> Email
                    </a>
                    {expert.phone && (
                      <a 
                        href={`tel:${expert.phone}`}
                        className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg text-sm flex items-center hover:from-green-700 hover:to-green-800 transition-all"
                      >
                        <FiMessageSquare className="mr-2" /> Call
                      </a>
                    )}
                    <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm flex items-center hover:from-purple-700 hover:to-purple-800 transition-all">
                      <FiUsers className="mr-2" /> Collaborate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main render function
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        // Demo/mock data for notifications, deadlines, and activity
        const mentorName = 'Professor Smith';
        const quickStats = [
          { label: 'Active Mentees', value: mentees.length, icon: FiUser, color: 'bg-blue-50 text-blue-700' },
          { label: 'Projects Mentored', value: projects.length, icon: FiBook, color: 'bg-green-50 text-green-700' },
          { label: 'Pending Reviews', value: 2, icon: FiCheckCircle, color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Notifications', value: 4, icon: FiBell, color: 'bg-purple-50 text-purple-700' },
        ];
        const notifications = [
          { id: 1, message: 'Priya submitted a milestone for "Urban Green Spaces Mapping".', time: '1h ago', action: 'Review', icon: FiCheckCircle, color: 'bg-yellow-50 text-yellow-700' },
          { id: 2, message: 'Rahul requested feedback on "Smart Waste Management System".', time: '2h ago', action: 'Give Feedback', icon: FiMessageSquare, color: 'bg-blue-50 text-blue-700' },
          { id: 3, message: 'New mentee request: Anjali Verma.', time: '5h ago', action: 'View', icon: FiUserPlus, color: 'bg-green-50 text-green-700' },
          { id: 4, message: 'Project "Renewable Energy Education Kit" deadline approaching.', time: '1d ago', action: 'View Deadline', icon: FiClock, color: 'bg-purple-50 text-purple-700' },
        ];
        const upcomingDeadlines = projects.flatMap(p => p.deadlines.filter(d => !d.completed).map(d => ({...d, project: p.title}))).slice(0, 3);
        const recentActivity = [
          { id: 1, text: 'You gave feedback to Priya on "Urban Green Spaces Mapping".', time: '1h ago' },
          { id: 2, text: 'Rahul submitted a new report for "Smart Waste Management System".', time: '3h ago' },
          { id: 3, text: 'You approved a milestone for "Renewable Energy Education Kit".', time: '1d ago' },
        ];
        return (
          <div className="space-y-8">
            {/* Welcome & Quick Stats */}
            <div className="flex flex-col gap-4">
          <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <FiUser className="text-blue-400" /> Welcome, {mentorName}!
                </h1>
              </div>
              <div className="flex gap-4 flex-wrap">
                {quickStats.map(stat => (
                  <div key={stat.label} className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-sm border ${stat.color}`}>
                    <stat.icon className="text-lg" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notifications/Alerts */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiBell className="text-purple-400" /> Notifications & Alerts
              </h2>
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`flex items-center gap-3 p-3 rounded-lg border ${n.color} shadow-sm`}> 
                    <n.icon className="text-xl" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{n.message}</div>
                      <div className="text-xs text-gray-500">{n.time}</div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all">{n.action}</button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Active Projects */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiBook className="text-green-400" /> Active Projects
              </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div key={project.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow h-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {project.sdgs.map(sdg => (
                        <span key={sdg} className="px-2 py-0.5 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">SDG {sdg}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map(member => (
                          <div key={member.id} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xs font-bold text-blue-800 border-2 border-white" title={member.name}>
                            {member.name.charAt(0)}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 border-2 border-white">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 ml-2">Progress:</span>
                      <span className="text-xs font-semibold text-blue-700">{project.progress}%</span>
                    </div>
                    <div className="flex-1" />
                    <div className="flex justify-end items-end mt-2">
                      <button
                        className="w-32 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700 transition-all"
                        onClick={() => window.location.href = `/dashboard/mentor/projects/${project.id}`}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentees At a Glance */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiUsers className="text-blue-400" /> Mentees At a Glance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentees.map(mentee => (
                  <div key={mentee.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col gap-2 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-lg font-bold text-blue-800">
                      {mentee.name.charAt(0)}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800">{mentee.name}</div>
                        <div className="text-xs text-gray-500">{mentee.project}</div>
                    </div>
                  </div>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100 hover:bg-blue-100 transition-all">Message</button>
                      <button className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold border border-gray-100 hover:bg-gray-100 transition-all">Profile</button>
                  </div>
                </div>
              ))}
                    </div>
                  </div>

            {/* Upcoming Deadlines */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiClock className="text-yellow-400" /> Upcoming Deadlines
              </h2>
              <div className="space-y-3">
                {upcomingDeadlines.length === 0 ? (
                  <div className="text-gray-500 text-sm">No upcoming deadlines.</div>
                ) : (
                  upcomingDeadlines.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border bg-yellow-50 text-yellow-800 border-yellow-100 shadow-sm">
                      <FiClock className="text-lg" />
                      <div className="flex-1">
                        <div className="font-medium">{d.title}</div>
                        <div className="text-xs">Project: {d.project} &middot; Due: {new Date(d.date).toLocaleDateString()}</div>
                </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FiBarChart2 className="text-blue-400" /> Recent Activity
              </h2>
              <div className="space-y-3">
                {recentActivity.map(a => (
                  <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 border-gray-100 shadow-sm">
                    <FiCheckCircle className="text-green-400 text-lg" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{a.text}</div>
                      <div className="text-xs text-gray-500">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'projects':
        return <ProjectManagement />;
      
      case 'mentees':
        return <MenteeProfiles />;
      
      case 'add-mentees':
        return <AddMentees />;
      
      case 'experts':
        return <ExpertNetwork />;
      
      default:
        return null;
    }
  };

  const pendingProjectActions = 2; // For demo, show badge on Project Management

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl rounded-r-2xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Mentor Dashboard
          </h1>
        </div>
        <nav className="mt-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg mb-1 relative ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default MentorDashboard;