var mysql = require('mysql');
var util = require('util');

const database = "court_documents";
const dir = "C:/Users/Courtland/Desktop/ScannedCourtDocumentProject/Backend/UploadedFiles";
var documentID = 0;

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: database
});

pool.getConnection((err, connection) => {
  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }
  if (connection) connection.release()
  return
});

pool.query = util.promisify(pool.query);

module.exports = pool;