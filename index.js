require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Task = require('./models/task')


morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


app.get('/api/tasks', (request, response) => {
  console.log('get tasks init');
  Task.find({}).then(tasks => {
    response.json(tasks)
  })
})

app.put('/api/tasks/:id', (request, response) => { //update single task
  console.log('update task init');
  return Task.updateOne(
    { _id: String(request.params.id) },
    { $set: {
      column: request.body.column,
      position: request.body.position
    }}
  ).then(result => {
    response.status(200).json({ message: "Update successful!" })
  })
})

app.post('/api/tasks', (request, response) => {
  console.log('POST method init');
  const body = request.body
  console.log(body);

  if (body.content === undefined) {
    return response.status(400).json({
      error: 'no task submited'
    })
  }

  const task = new Task ({
    content: body.content,
    date: new Date(),
    column: body.column,
    position: body.position
  })

  task.save().then(savedTask => {
    console.log('task saved');
    response.json(savedTask)
  })

})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
})