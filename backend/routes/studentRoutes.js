const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const studentController = require('../controllers/studentController');
const timelineController = require('../controllers/timelineController');

// @route   POST /api/students
// @desc    Create new student
// @access  Private (Admin only)
router.post('/', authMiddleware, studentController.createStudent);

// @route   GET /api/students
// @desc    Get all students
// @access  Private (Admin/Mentor)
router.get('/', authMiddleware, studentController.getAllStudents);

// @route   PUT /api/students/:studentId/mentor
// @desc    Assign mentor to student
// @access  Private (Admin only)
router.put('/:studentId/mentor', authMiddleware, studentController.assignMentor);

router.put('/:studentId/create-project', authMiddleware, studentController.createStudentProject);

router.get('/project-student', authMiddleware, studentController.studentProject);

// @route   GET /api/students/projects
// @desc    Get all projects
// @access  Private (Admin/Mentor)
router.get('/projects', authMiddleware, studentController.getAllProjects);

// @route   PUT /api/students/project/:projectId
// @desc    Update a project
// @access  Private
router.put('/project/:projectId', authMiddleware, studentController.updateProject);

// @route   DELETE /api/students/project/:projectId
// @desc    Delete a project
// @access  Private
router.delete('/project/:projectId', authMiddleware, studentController.deleteProject);


router.post(
    '/:studentId/upload-file',
    authMiddleware,
    upload.single('file'),
    studentController.uploadFile
);

router.get('/:studentId/download-file', authMiddleware, studentController.downloadFile);

// Timeline routes - consolidated
router.post('/projects/:projectId/timeline', authMiddleware, timelineController.addTimelineEvent);
router.get('/projects/:projectId/timeline', authMiddleware, timelineController.getProjectTimeline);
router.put('/timeline/:id', authMiddleware, timelineController.updateTimelineEvent);
router.delete('/timeline/:id', authMiddleware, timelineController.deleteTimelineEvent);

module.exports = router;