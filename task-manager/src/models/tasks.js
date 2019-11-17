const mongoose = require('mongoose');

const taskSchemaNew = mongoose.Schema({
  discription : {
    type: String,
    required:true,
    trim : true
  },
  completed : {
    type: Boolean,
    default: false
  }
})

taskSchemaNew.pre('save', async function(next){  
  next();  
})

const Task = mongoose.model('Task',taskSchemaNew);



module.exports = Task;