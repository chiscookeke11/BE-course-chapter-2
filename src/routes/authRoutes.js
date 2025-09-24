import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'


const router = express.Router()



// register a new user
router.post('/register', (req, res) => {
const {username, password} = req.body

const hashedPassword = bcrypt.hashSync(password, 8)


// save the new user and hashed password to the db
try {
} catch (error) {
console.error(error.message)
res.sendStatus(503)
}




console.log(hashedPassword)



// console.log(username, password)
res.status(201).json("account created")

})

router.post('/login', (req, res) => {
const {username, password} = req.body
// console.log(username)
res.sendStatus(201)
})



export default router