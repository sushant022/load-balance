// load-balance/models/semester.js
const express = require('express');
const router = express.Router();
const Semester = require('../models/semester');
const Subject = require('../models/subject');
// Create a new semester
router.post('/', async (req, res) => {
    try {
        const semester = await Semester.create(req.body);
        res.status(201).json(semester);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all semesters
router.get('/', async (req, res) => {
    try {
        const semesters = await Semester.findAll();
        res.status(200).json(semesters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a semester by ID
router.get('/:id', async (req, res) => {
    try {
        const semester = await Semester.findByPk(req.params.id);
        if (semester) {
            res.status(200).json(semester);
        } else {
            res.status(404).json({ error: 'Semester not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a semester by ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Semester.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSemester = await Semester.findByPk(req.params.id);
            res.status(200).json(updatedSemester);
        } else {
            res.status(404).json({ error: 'Semester not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a semester by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Semester.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Semester not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:semesterId/subjects', async (req, res) => {
    try {
        const subject = await Subject.create({ ...req.body, semester_id: req.params.semesterId });
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:semesterId/subjects', async (req, res) => {
    try {
        const subjects = await Subject.findAll({ where: { semester_id: req.params.semesterId } });
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:semesterId/subjects/:subjectId', async (req, res) => {
    try {
        const subject = await Subject.findOne({ where: { id: req.params.subjectId, semester_id: req.params.semesterId } });
        if (subject) {
            res.status(200).json(subject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:semesterId/subjects/:subjectId', async (req, res) => {
    try {
        const [updated] = await Subject.update(req.body, {
            where: { id: req.params.subjectId, semester_id: req.params.semesterId }
        });
        if (updated) {
            const updatedSubject = await Subject.findOne({ where: { id: req.params.subjectId } });
            res.status(200).json(updatedSubject);
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:semesterId/subjects/:subjectId', async (req, res) => {
    try {
        const deleted = await Subject.destroy({
            where: { id: req.params.subjectId, semester_id: req.params.semesterId }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Subject not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:semesterId/load', async (req, res) => {
    try {
        let result = []
        const subjects = await Subject.findAll({ where: { semester_id: req.params.semesterId } });
        for (const subject of subjects) {
            total_theory_hours = subject.batch_count * subject.theory_hours_per_week
            total_practical_hours = subject.division_count * subject.practical_hours_per_week
            result.push({
                code: subject.code,
                name: subject.name, 
                theory_hours_per_week: subject.theory_hours_per_week,
                total_theory_hours: total_theory_hours,
                practical_hours_per_week: total_practical_hours,
                batch_count: subject.batch_count,
                division_count: subject.division_count,
                total_faculty_hours: total_theory_hours + total_practical_hours
            })
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;