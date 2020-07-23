// Require mongoose
const mongoose = require('mongoose')

const Schema = mongoose.Schema
// Project Schema consists of name, description, skills and team
// When a user joins the project their ID is added to the teams array and their information can be populated
const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    skills: {
      type: String,
      required: true
    },
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Project = mongoose.model('Project', ProjectSchema)
// Export the Project model
module.exports = Project
