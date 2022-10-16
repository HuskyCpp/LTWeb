const mysql = require("../config/db");
const HomeController = require("./HomeController");

class DeleteController {
  delete(req, res, err) {
    let con = mysql.connect();
    let params = req.params;
    console.log("Params ", params);

    con.query(
      "DELETE FROM book WHERE id=?;",
      params.idDelete,
      function (err, result, fields) {
        if (err) throw err;
        console.log(" RESULT :  ", result);
        HomeController.init(req, res);
      }
    );
  }
}
module.exports = new DeleteController();
