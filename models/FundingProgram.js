const mongoose = require('mongoose');

const fundingProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the program name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    organization: {
        type: String,
        required: [true, 'Please provide the organization name']
    },
    fundingAmount: {
        type: String,
        required: [true, 'Please provide the funding amount']
    },
    eligibility: {
        type: [String],
        required: [true, 'Please provide eligibility criteria']
    },
    applicationDeadline: {
        type: Date,
        required: [true, 'Please provide the application deadline']
    },
    website: {
        type: String,
        required: [true, 'Please provide the website URL']
    },
    category: {
        type: String,
        enum: ['government', 'private', 'accelerator', 'incubator', 'angel', 'venture_capital'],
        required: [true, 'Please provide the category']
    },
    location: {
        type: String,
        enum: [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
            'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
            'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Bangalore',
            'Hyderabad', 'Mumbai', 'Chennai', 'Kolkata', 'Pune'
        ],
        required: [true, 'Please provide the location']
    },
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
fundingProgramSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('FundingProgram', fundingProgramSchema); 