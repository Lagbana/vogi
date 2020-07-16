const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
module.exports = Project
