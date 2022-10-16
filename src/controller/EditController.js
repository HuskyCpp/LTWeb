const mysql = require("../config/db");
const HomeController = require("./HomeController");

class EditController {
  init(req, res) {
    let params = req.params;
    let con = mysql.connect();

    con.query(
      "SELECT * FROM book WHERE id = ?",
      params.id,
      function (err, result, fields) {
        if (err) throw err;
        let book = result[0];
        console.log("BGook Find !!", book);
        res.render("edit", { book });
      }
    );
  }

  update(req, res) {
    let editConfig = {};
    let con = mysql.connect();
    let newConfig = {};

    console.log("Request ", Object.values(req.body));
    let editArr = Object.values(req.body);
    if (editArr[3] == "on") editArr[3] = true;
    else editArr[3] = false;

    editArr.push(editArr[0]);
    editArr.splice(0, 1);
    console.log(" editArr Request ", editArr);

    con.query(
      "UPDATE book SET title = ?, author = ?, approved = ? WHERE id = ?;",
      editArr,
      function (err, result, fields) {
        if (err) {
          //   console.log(err);
          newConfig.isSuccess = false;
          if (err.code == "ER_DUP_ENTRY") {
            newConfig.errMsg = "Sách đã có trong CSDL !!";
          } else {
            newConfig.errMsg = err.code;
          }
          console.log("newConfig ", newConfig);
          //   res.render("home", { newConfig });
          return;
        }
        console.log("Insert result : ", result);
        newConfig.isSuccess = true;
        console.log("newConfig ", newConfig);
        HomeController.init(req, res);
    //   let book = result;
        //   res.render("home", { book });
      }
    );
  }
}
module.exports = new EditController();
