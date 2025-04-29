const { Timeline, Project } = require('../models');

exports.getProjectTimeline = async (req, res) => {
    try {
        const { projectId } = req.params;
        const timeline = await Timeline.findAll({
            where: { projectId },
            order: [['date', 'ASC']]
        });

        if (!timeline.length) {
            return res.status(404).json({ message: 'Timeline not found for this project' });
        }

        res.json(timeline);
    } catch (err) {
        console.error('Error fetching timeline:', err);
        res.status(500).json({ message: 'Failed to retrieve timeline' });
    }
};

exports.addTimelineEvent = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { event, date } = req.body;

        const newEvent = await Timeline.create({
            projectId,
            event,
            date
        });

        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error adding timeline event:', err);
        res.status(500).json({ message: 'Failed to add timeline event' });
    }
};

exports.updateTimelineEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { event, date } = req.body;

        const timelineEvent = await Timeline.findByPk(id);
        if (!timelineEvent) {
            return res.status(404).json({ message: 'Timeline event not found' });
        }

        await timelineEvent.update({ event, date });
        res.json(timelineEvent);
    } catch (err) {
        console.error('Error updating timeline event:', err);
        res.status(500).json({ message: 'Failed to update timeline event' });
    }
};

exports.deleteTimelineEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const timelineEvent = await Timeline.findByPk(id);
        if (!timelineEvent) {
            return res.status(404).json({ message: 'Timeline event not found' });
        }

        await timelineEvent.destroy();
        res.json({ message: 'Timeline event deleted successfully' });
    } catch (err) {
        console.error('Error deleting timeline event:', err);
        res.status(500).json({ message: 'Failed to delete timeline event' });
    }
};