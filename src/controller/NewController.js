const mysql = require("../config/db");

class NewController {
  insert(req, res) {
    let newConfig = {};
    let con = mysql.connect();

    console.log("Request ", Object.values(req.body));
    let insertArr = Object.values(req.body);
    if (insertArr[3] == "on") insertArr[3] = true;
    else insertArr[3] = false;
    console.log(" insertArr Request ", insertArr);

    con.query(
      "insert into Book (id,title,author,approved) values (?, ? , ?, ?)",
      insertArr,
      function (err, result, fields) {
        if (err) {
        //   console.log(err);
          newConfig.isSuccess = false;
          if (err.code == "ER_DUP_ENTRY") {
            newConfig.errMsg = "Sách đã có trong CSDL !!";
          } else {
            newConfig.errMsg = err.code;
          }
          console.log("newConfig ", newConfig)
          res.render("new", { newConfig });
          return;
        }
        console.log("Insert result : ", result);
            newConfig.isSuccess = true;
          console.log("newConfig ", newConfig)
          res.render("new", { newConfig });
        //   let book = result;
        //   res.render("home", { book });
      }
    );
    
  }
}
module.exports = new NewController();
