const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const path = require("path");
const mysql = require("./config/db");
const HomeController = require("./controller/HomeController");
const NewController = require("./controller/NewController");
const EditController = require("./controller/EditController");
const DeleteController = require("./controller/DeleteController");

//mysql connect
mysql.connect();

// body-prase
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "\\main\\view"));

console.log("__dirname", __dirname);
app.get("/", (req, res) => {
  HomeController.init(req, res);
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {

  NewController.insert(req, res);
});

app.get("/:id/edit", (req, res) => {
  console.log("req.params ", req.params)
  EditController.init(req, res)
  // res.render("edit");
});

app.post("/:id/edit", (req, res) => {
  EditController.update(req,res)
});


app.get("/:idDelete/delete", (req, res) => {
  DeleteController.delete(req, res)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
