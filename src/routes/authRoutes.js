import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'


const router = express.Router()



// register a new user
router.post('/register', (req, res) => {
    const { username, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)


    // save the new user and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now that we have a user, we will add a default todo
        const defaultTodo = "Hello!, Add your first todo"
        const insertTodo = db.prepare(`INSERT INTO  todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)


        // create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })

    } catch (error) {
        console.error(error.message)
        res.sendStatus(503)
    }

    console.log(hashedPassword)

    // console.log(username, password)
    res.status(201).json("account created")

})


// log in a user
router.post('/login', (req, res) => {
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it is encrypted, which means that we cannot compare it to the one the user is trying to login,
    // so what we can do, is , one way to encrypt the password the user just entered





    const { username, password } = req.body

    try {
        const getUser = db.prepare(`SELECT * FROM users     WHERE username = ?`)
        const user = getUser.get(username)

        if (!user) {
            return res.status(404).send({ message: "User not found" })
        }
        // validating the password
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid Password" })
        }

        // then we have a successful auth
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24hr' })
        res.json({ token })

        console.log(user)

    }
    catch (err) {
        console.err(err.message)
        res.sendStatus(503)
    }
})



export default router