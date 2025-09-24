



import express from 'express'
import path,  {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'



// we instantiate express
const app = express()

// we declare our port
const PORT = process.env.PORT || 5000

// get the file path from the URL of the current website
const __filename = fileURLToPath(import.meta.url)
//get the directory name from the file path
const __dirname = dirname(__filename)

// MILDDLEWARE
app.use(express.json()) // this line converts data recieved to json format
// servces the HTML files from the /public directory
// Tells express to serve all files from the public folder as static assets / files. Any request for the css files will be resolved to the public directory.
// This line tells our code where to find the public directory.
app.use(express.static(path.join(__dirname, '../public')))


//routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)




// serving up the HTML file from the /public directory
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public', 'index.html'))
} )




// listen for the post running then send out a messgae on the console. this must be the last thing on our script
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})