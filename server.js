require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

apiRoutes()

app.listen(3001, () => {
  console.log('Server listening on port 3001!')
})

function apiRoutes() {
  app.get('/images', (req, res) => {
    connection.query('SELECT * FROM images', (err, results) => {
      if (err) {
        console.error('Error executing query: ', err)
        res.status(500).send('Server Error')
      } else {
        res.send(results)
      }
    })
  })

  app.get('/images/:id', (req, res) => {
    connection.query(
      'SELECT * FROM images WHERE id = ?',
      [req.params.id],
      (err, result) => {
        if (err) {
          console.error('Error retrieving item:', err)
          res.status(500).json({ error: 'Error retrieving item' })
        } else if (result.length === 0) {
          res.status(404).json({ error: 'Item not found' })
        } else {
          res.json(result[0])
        }
      }
    )
  })

  app.post('/images', (req, res) => {
    const { source } = req.body
    connection.query(
      'INSERT INTO `images` (id, source) VALUES (NULL, ?)',
      [source],
      (err, result) => {
        res.status(200).json(result)
      }
    )
  })

  app.delete('/images/:id', (req, res) => {
    connection.query(
      `DELETE FROM images WHERE id = ${req.params.id}`,
      (error, result) => {
        if (error) {
          console.log('Error deleting item:', error)
          res.status(500).send(error)
        } else {
          console.log(`Item with ID ${req.params.id} deleted successfully`)
          res.send([])
        }
      }
    )
  })
}
