const mysql = require("../config/db");

class HomeController {
  init(req, res, err) {
    let con = mysql.connect();
    con.query("SELECT * FROM book", function (err, result, fields) {
      if (err) throw err;
      let book = result;
      res.render("home", { book });
    });
  }
}
module.exports = new HomeController();
