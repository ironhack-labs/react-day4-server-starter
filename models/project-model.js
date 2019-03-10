const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./task-model')
const User = require('./user-model');


const projectSchema = new Schema ({
  title: String,
  description: String,
  task: [{
    type: Schema.Types.ObjectId,
    ref: "Task"
  }],
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;


