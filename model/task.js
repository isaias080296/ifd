const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
  email: String,
  phone: String,
  description: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('tasks', TaskSchema);
