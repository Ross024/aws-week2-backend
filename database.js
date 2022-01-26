const mysql = require("mysql2")

// how to connect to database
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise()

// gets all images from database
async function getImages() {
  let query = `
  SELECT * 
  FROM images
  ORDER BY created DESC
  `

  const [rows] = await pool.query(query);
  return rows
}
exports.getImages = getImages

// gets a specific image from database
async function getImage(id) {
  let query = `
  SELECT * 
  FROM images
  WHERE id = ?
  `

  const [rows] = await pool.query(query, [id]);
  const result = rows[0];
  return result
}
exports.getImage = getImage

// inserts an image into the database
async function addImage(filePath, description) {
  let query = `
  INSERT INTO images (file_path, description)
  VALUES(?, ?)
  `

  const [result] = await pool.query(query, [filePath, description]);
  const id = result.insertId

  return await getImage(id)
}
exports.addImage = addImage