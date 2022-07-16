const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to: ', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message);
  })

const taskSchema = new mongoose.Schema({
  content: String,
  date: Date,
  column: Number,
  position: Number
})

taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const boardSchema = new mongoose.Schema({
  board: [[taskSchema]]
})

module.exports = mongoose.model('Task', taskSchema)
