
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide password as an argument: node mongo.js <password></password>');
    process.exit(1)
}


const password = process.argv[2]
const content = process.argv[3]


const url = 
`mongodb://fullstack:${password}@cluster0-shard-00-00.3pyun.mongodb.net:27017,cluster0-shard-00-01.3pyun.mongodb.net:27017,cluster0-shard-00-02.3pyun.mongodb.net:27017/productivity_database?ssl=true&replicaSet=atlas-d0rf7w-shard-0&authSource=admin&retryWrites=true&w=majority` 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})


const taskSchema = new mongoose.Schema({
    content: String,
    date: Date,
    priority: Boolean,
})

const Task = mongoose.model('Task', taskSchema)

if (content) {
    console.log('content input');
    const task = new Task({
        content: content,
        date: new Date(),
        priority: false,
    })

    task.save().then(result => {
        console.log(`Added task with content ${content}`);
        mongoose.connection.close()
    })
} else {
    console.log('no content input');
    Task.find({}).then(result => {
        result.forEach(task => {
            console.log(`Task: ${task.content} - Date: ${task.date} - Priority: ${task.priority}`);
        })
        mongoose.connection.close()
    })
}