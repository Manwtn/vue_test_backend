const express = require('express')
const app = express()
const port = 3000
const mysql2 = require('mysql2')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const conn = mysql2.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Man260243',
    database: 'restapi'
  });



app.get('/users', async (req, res) => {
  let sql = "SELECT * FROM users"

  await conn.execute(sql,
    (err, result) => {
        if(err) {
            res.status(500).json({
                message : err.message
            })
            return
        }
        res.status(200).json({
            message : "เรียกข้อมูลสำเร็จ",
            data : result
        })
    })
})

app.post('/users', async (req, res) => {
    const { name, address, score} = req.body
    let sql = "INSERT INTO users (name, address, score) VALUES (?, ?, ?)"
    conn.execute(sql,
        [name, address, score],
        (err, result) => {
            if(err) {
                res.status(500).json({
                    message : err.message
                })
                return
            }
            res.status(201).json({
                message : "เพิ่มข้อมูลสำเร็จ",
                data : result
            })
    })
})

app.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, address, score } = req.body
    
    let sql = "UPDATE users SET name = ?, address = ?, score = ? WHERE id = ?"
    conn.execute(sql,
        [name, address, score, id],
        (err, result) => {
            if(err) {
                res.status(500).json({
                    message : err.message
                })
                return
            }
            res.status(201).json({
                message : "แก้ไขข้อมูลเรียบร้อย",
                data : result
            })

        })
})

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    let sql = "DELETE FROM users WHERE id = ?"
    
    await conn.execute(sql,
        [id],
        (err, result) => {
            if(err) {
                res.status(500).json({
                    message : err.message
                })
                return
            }
            res.status(200).json({
                message : "ลบข้อมูลสำเร็จ",
                data : result
            })

        })
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})