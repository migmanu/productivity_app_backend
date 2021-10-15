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


app.get('/', (request, response) => {
  console.log('GET src init');
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/tasks', (request, response) => {
    console.log('get tasks init');
    Task.find({}).then(tasks => {
      response.json(tasks)
    })
})

app.get('/api/tasks/:id', (request, response) => {
    console.log('Get single task init');
    Task.findById(request.params.id)
      .then(task => {
        console.log('match found');
        response.json(task)
      })
      .catch(() => {
        console.log('No match found');
      })
})


//app.use(morgan(':method :url :status :response-time :body'))

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