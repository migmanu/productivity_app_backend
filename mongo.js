
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password as an argument: node mongo.js <password></password>');
  process.exit(1)
}


const password = process.argv[2]
const content = process.argv[3]


const url =
  `mongodb://fullstack:${password}@cluster0-shard-00-00.3pyun.mongodb.net:27017,cluster0-shard-00-01.3pyun.mongodb.net:27017,cluster0-shard-00-02.3pyun.mongodb.net:27017/kanban_board?ssl=true&replicaSet=atlas-d0rf7w-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


const boardSchema = new mongoose.Schema({
  board: []
})

const Board = mongoose.model('Board', boardSchema)

const board = new Board({
  board: [[{ content: "try" }, { content: "otro" }], [{ content: "segunda columna" }]]
})



board.save().then(result => {
  console.log(`board save with content: ${board}`)
  mongoose.connection.close()
})



