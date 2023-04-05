require('dotenv').config()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  port: process.env.PORT,
  password: process.env.PASSWORD,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log('Connected to MySQL')

  connection.query(
    'CREATE DATABASE IF NOT EXISTS galleryreact',
    (err, result) => {
      if (err) {
        console.error('Error creating database:', err)
        return
      }
      console.log('Database created')
    }
  )

  connection.query(
    'CREATE TABLE IF NOT EXISTS `galleryreact`.`images` (`id` INT NOT NULL AUTO_INCREMENT , `source` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;',
    (err, result) => {
      if (err) {
        console.error('Error creating table:', err)
        return
      }
      console.log('Table created')
      connection.end()
    }
  )
})
