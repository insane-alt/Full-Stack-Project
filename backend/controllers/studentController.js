const { User, Student, Mentor, Project, Timeline } = require('../models');

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const { username, email, password, rollNumber, department, year, semester, mentorId } = req.body;

    // Create user first
    const user = await User.create({
      username,
      email,
      password,
      userType: 'student'
    });

    // Create student profile
    const student = await Student.create({
      userId: user.id,
      rollNumber,
      department,
      year,
      semester,
      mentorId
    });

    res.status(201).json({ user, student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: Mentor,
          include: [{
            model: User,
            attributes: { exclude: ['password'] }
          }]
        }
      ]
    });

    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign mentor to student
exports.assignMentor = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    // Check if mentor has capacity
    if (mentor.currentStudents >= mentor.maxStudents) {
      return res.status(400).json({ message: 'Mentor has reached maximum student capacity' });
    }

    student.mentorId = mentorId;
    await student.save();

    // Update mentor's current students count
    mentor.currentStudents += 1;
    await mentor.save();

    res.json({ message: 'Mentor assigned successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a project for a student
exports.createStudentProject = async (req, res) => {
  try {
    console.log('Creating project with data:', req.body);
    const { studentId } = req.params;  // Get studentId from URL params

    const {
      projectTitle,
      projectDescription,
      projectObjectives,
      expectedOutcomes,
      projectStatus,
      projectStartDate,
      projectEndDate,
      requiredSkills,
      sdgMapping,
      teamMembers,
      mentors,
      collaborators,
      githubLink,
      teamSize
    } = req.body;

    // Create project with mapped fields
    const project = await Project.create({
      title: projectTitle,           // Map to title field
      summary: projectDescription,    // Map to required summary field
      description: projectDescription, // Map to description field
      projectObjectives,             // Direct mapping
      expectedOutcomes,              // Direct mapping
      status: projectStatus || 'Pending',
      startDate: projectStartDate,
      endDate: projectEndDate,
      requiredSkills,                // Direct mapping
      sdgs: sdgMapping,              // Map sdgMapping to sdgs field
      teamMembers,                   // Direct mapping
      mentors,                       // Direct mapping
      collaborators,                 // Direct mapping
      githubLink,                    // Direct mapping
      teamSize: teamSize || 1,       // Use provided teamSize or default to 1
      userId: studentId              // Use studentId from params
    });

    console.log('Project created successfully:', project.id);
    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({
      message: 'Failed to create project',
      error: err.message,
      details: err.errors?.map(e => e.message)
    });
  }
};

exports.studentProject = async (req, res) => {
  try {
    print('studentProject called');
    const { studentId } = req.params;
    const project = await Project.findAll({ where: { userId: studentId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found for this student' });
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve project' });
  }
}

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve projects' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updated = await Project.update(req.body, {
      where: { id: projectId }
    });

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Project not found or no changes made' });
    }

    const updatedProject = await Project.findByPk(projectId);
    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deleted = await Project.destroy({ where: { id: projectId } });

    if (!deleted) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file type' });
    }

    const project = await Project.findOne({ where: { userId: studentId } });

    if (!project) {
      return res.status(404).json({ message: 'Project not found for this student' });
    }

    project.uploadedFile = file.buffer;
    project.fileType = file.mimetype;
    project.fileName = file.originalname;
    await project.save();

    res.json({ message: 'File uploaded successfully', fileName: file.originalname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error uploading file' });
  }
};


exports.downloadFile = async (req, res) => {
  try {
    const { studentId } = req.params;
    const project = await Project.findOne({ where: { userId: studentId } });

    if (!project || !project.uploadedFile) {
      return res.status(404).json({ message: 'No file found' });
    }

    res.set('Content-Type', project.fileType);
    res.set('Content-Disposition', `attachment; filename=${project.fileName}`);
    res.send(project.uploadedFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to download file' });
  }
};



exports.addTimelineEntry = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, milestoneDate } = req.body;

    const timeline = await Timeline.create({ projectId, title, description, milestoneDate });
    res.status(201).json(timeline);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add timeline entry' });
  }
};

exports.getTimeline = async (req, res) => {
  try {
    const { projectId } = req.params;
    const timeline = await Timeline.findAll({ where: { projectId }, order: [['milestoneDate', 'ASC']] });
    res.json(timeline);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch timeline' });
  }
};

exports.editTimelineEntry = async (req, res) => {
  try {
    const { timelineId } = req.params;
    const { title, description, milestoneDate } = req.body;

    const entry = await Timeline.findByPk(timelineId);
    if (!entry) return res.status(404).json({ message: 'Timeline entry not found' });

    await entry.update({ title, description, milestoneDate });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update timeline entry' });
  }
};

exports.deleteTimelineEntry = async (req, res) => {
  try {
    const { timelineId } = req.params;
    const entry = await Timeline.findByPk(timelineId);
    if (!entry) return res.status(404).json({ message: 'Timeline entry not found' });

    await entry.destroy();
    res.json({ message: 'Timeline entry deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete timeline entry' });
  }
};

