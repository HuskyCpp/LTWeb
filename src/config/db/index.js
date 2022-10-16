const mysql = require("mysql");

connect = () => {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "demo",
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
  return con
};

getAll = () => {
    let con = connect()
    con.query("SELECT * FROM book", function (err, result, fields) {
        if (err) throw err;
      })
}

module.exports = {connect, getAll};
