const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FundingProgram = require('../models/FundingProgram');
const Application = require('../models/Application');

// Get all funding programs
router.get('/', async (req, res) => {
    try {
        const programs = await FundingProgram.find();
        res.json(programs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific program
router.get('/:id', async (req, res) => {
    try {
        const program = await FundingProgram.findById(req.params.id);
        if (!program) {
            return res.status(404).json({ message: 'Program not found' });
        }
        res.json(program);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user's applications (protected route)
router.get('/applications/my', auth, async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user.id })
            .populate('program', 'name organization fundingAmount');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get application details
router.get('/applications/:id', auth, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id)
            .populate('program', 'name organization fundingAmount')
            .populate('user', 'name email');
        
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        
        // Check if the user is authorized to view this application
        if (application.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        
        res.json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 