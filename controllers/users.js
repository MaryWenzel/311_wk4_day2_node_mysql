const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users JOIN usersContact ON users.id = usersContact.user_id JOIN usersAddress ON users.id = usersAddress.user_id ;", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT * FROM users WHERE id = ${req.params.id}`
  // what goes in the brackets?
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}


// CREATE A USER W/ONLY FIRST AND LAST NAME
const createUser = (req, res) => {
  //   -----let sql = "INSERT INTO users (first_name, last_name) VALUES ("bogus", "user")----- To Insert User From ReadMe
   // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', 'last_name', req.body.first_name, req.body.last_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId});
  })
}

// const createUser = (req, res) => {
//   let sql = "START TRANSACTION; INSERT INTO ?? (??,??) VALUES (?, ?); INSERT INTO ?? (??, ??, ??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?); INSERT INTO ?? (??, ??, ??, ??) VALUES (LAST_INSERT_ID(), ?, ?, ?); COMMIT;"
  
//   sql = mysql.format(sql,
//      ["users", "first_name", "last_name", req.body.first_name, req.body.last_name,  
//      "usersAddress", "user_id", "address", "city", "county", "state", "zip", req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip, 
//      "usersContact", "user_id", "phone1", "phone2", "email", req.body.phone1, req.body.phone2, req.body.email])

//      pool.query(sql, (err, results) => {
//           if (err) return handleSQLError(res, err)
//           return res.json({ newId: results.insertId});
//         })

// }

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, 'id', req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json(results);
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = `DELETE FROM users WHERE first_name = "bogus"`
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}