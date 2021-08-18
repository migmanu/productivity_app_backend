const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())


let tasks = [
    {
      "id": 1,
      "content": "Conquer the world",
      "date": "10/09/2020",
      "priority": true
    },
    {
      "id": 2,
      "content": "Clean my room",
      "date": "11/09/2020",
      "priority": false
    },
    {
      "date": "2021-08-10T11:47:32.783Z",
      "priority": true,
      "id": 3
    },
    {
      "content": "asdf",
      "date": "2021-08-10T11:50:42.531Z",
      "priority": true,
      "id": 4
    },
    {
      "content": "do more things",
      "date": "2021-08-10T11:52:54.492Z",
      "priority": true,
      "id": 5
    },
    {
      "content": "do better things",
      "date": "2021-08-10T12:33:01.780Z",
      "priority": false,
      "id": 6
    },
    {
      "content": "perfect the app!",
      "date": "2021-08-10T12:41:49.954Z",
      "priority": true,
      "id": 7
    }
  ]

app.get('/', (request, response) => {
  console.log('GET src init');
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/tasks', (request, response) => {
    console.log('get tasks init');
    response.json(tasks)
})

app.get('/api/tasks/:id', (request, response) => {
    console.log('Get single person init');
    const id = Number(request.param.id)
    const task = tasks.find(task => task.id === id)

    if (task) {
        response.json(task)
    } else {
        response.status(404).send('<h1>[404 No match found for selected task</h1>').end()
    }
})

const generateID = () => {
  return Math.floor(Math.random() * 50)
}

//app.use(morgan(':method :url :status :response-time :body'))

app.post('/api/tasks', (request, response) => {
  console.log('POST method init');
  console.log(request.body);
  const body = request.body
  console.log(body);

  if (!body.content) {
    return response.status(400).json({
      error: 'no task submited'
    })
  }

  const task = {
    content: "this content is a test",
    date: new Date(),
    priority: true,
    ID: generateID()
  }

  tasks = tasks.concat(task)

  response.json(task)

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server runnning on port ${PORT}`);
})