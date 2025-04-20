const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user ID']
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundingProgram',
        required: [true, 'Please provide the program ID']
    },
    status: {
        type: String,
        enum: ['pending', 'submitted', 'under_review', 'accepted', 'rejected'],
        default: 'pending'
    },
    submissionDate: {
        type: Date
    },
    documents: [{
        name: String,
        url: String,
        uploadedAt: Date
    }],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
applicationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Application', applicationSchema); 