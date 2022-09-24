var express = require('express');
var router = express.Router();
let mysql = require('mysql');

let conn = require("./connect");

// middleware สำหรับแปลง json object เป็น javascript object
router.use(express.json());


let bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET home page. */
router.post('/create', async (req, res) => {

  const { name, email, password } = req.body;

  try {
    let sql = "INSERT INTO users set name=? , email=? , password=?";
    conn.query(sql, [name, email, password], (err, result, fields) => {
      if (err) {
        console.log("Error While insert a user into database", err);
        return res.status(400).send();
      }

      return res.status(201).json({
        message: "New user successfully created!"
      });
    })

  } catch (e) {

    console.log(e);
    return res.status(500).send();

  }
})












module.exports = router;
