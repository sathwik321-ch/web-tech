const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Application = require('../models/Application');
const FundingProgram = require('../models/FundingProgram');
const { check, validationResult } = require('express-validator');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    const filetypes = /pdf|doc|docx|ppt|pptx|xls|xlsx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Documents only!');
    }
  }
});

// @route   POST api/applications
// @desc    Submit a new application
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('programId', 'Program ID is required').not().isEmpty(),
      check('startupName', 'Startup name is required').not().isEmpty(),
      check('startupStage', 'Startup stage is required').not().isEmpty(),
      check('industry', 'Industry is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('fundingNeeded', 'Funding amount is required').isNumeric(),
      check('revenue', 'Revenue is required').isNumeric(),
      check('teamSize', 'Team size is required').isNumeric()
    ],
    upload.fields([
      { name: 'pitchDeck', maxCount: 1 },
      { name: 'financialProjections', maxCount: 1 },
      { name: 'incorporationDoc', maxCount: 1 }
    ])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        programId,
        startupName,
        startupStage,
        industry,
        description,
        fundingNeeded,
        revenue,
        teamSize
      } = req.body;

      // Check if program exists
      const program = await FundingProgram.findById(programId);
      if (!program) {
        return res.status(404).json({ message: 'Program not found' });
      }

      // Check if user already has an application for this program
      const existingApplication = await Application.findOne({
        user: req.user.id,
        program: programId
      });

      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this program' });
      }

      // Process uploaded files
      const documents = [];
      if (req.files) {
        if (req.files.pitchDeck) {
          documents.push({
            name: 'Pitch Deck',
            url: `/uploads/${req.files.pitchDeck[0].filename}`,
            uploadedAt: Date.now()
          });
        }
        if (req.files.financialProjections) {
          documents.push({
            name: 'Financial Projections',
            url: `/uploads/${req.files.financialProjections[0].filename}`,
            uploadedAt: Date.now()
          });
        }
        if (req.files.incorporationDoc) {
          documents.push({
            name: 'Incorporation Document',
            url: `/uploads/${req.files.incorporationDoc[0].filename}`,
            uploadedAt: Date.now()
          });
        }
      }

      // Create new application
      const newApplication = new Application({
        user: req.user.id,
        program: programId,
        startupName,
        startupStage,
        industry,
        description,
        fundingNeeded,
        revenue,
        teamSize,
        documents,
        status: 'pending',
        submissionDate: Date.now()
      });

      await newApplication.save();

      res.status(201).json(newApplication);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/applications
// @desc    Get all applications for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('program', 'name organization fundingAmount category')
      .sort({ submissionDate: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/:id
// @desc    Get application by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('program', 'name organization fundingAmount category')
      .populate('user', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user is authorized to view this application
    if (application.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/applications/:id
// @desc    Update application status
// @access  Private/Admin
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { status, notes } = req.body;

    let application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update fields
    if (status) application.status = status;
    if (notes) application.notes = notes;

    await application.save();
    res.json(application);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/admin/all
// @desc    Get all applications (admin only)
// @access  Private/Admin
router.get('/admin/all', [auth, admin], async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('program', 'name organization fundingAmount category')
      .populate('user', 'name email')
      .sort({ submissionDate: -1 });
    res.json(applications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/applications/:id
// @desc    Delete application
// @access  Private/Admin
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete associated files
    if (application.documents && application.documents.length > 0) {
      application.documents.forEach(doc => {
        const filePath = path.join(__dirname, '..', doc.url);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await application.remove();
    res.json({ message: 'Application removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 