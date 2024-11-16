const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      body: { type: String, required: true },
      status: { type: String, enum: ['Development', 'Testing', 'Design'], default: 'Development' },
      assignee: { type: String },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Project', projectSchema);
