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



/* POST Insert new user to database */
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




/* GET Read user from Database */
router.get('/read', async (req, res) => {
  try {

    let sql = "SELECT * FROM users";

    conn.query(sql, (err, result) => {

      if (err) {
        console.log(err);
        return res.status(400).send();
      }

      return res.status(200).json(result);

    })

  } catch (e) {

    console.log(e);
    return res.status(500).send();

  }
})




/* GET Read single user from Database by Email */
router.get('/read/single/:email', async (req, res) => {
  
  let email = req.params.email;

  try {

    let sql = "SELECT * FROM users WHERE email=?";

    conn.query(sql, [email], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(400).send();
      }

      return res.status(200).json(result);

    })

  } catch (e) {

    console.log(e);
    return res.status(500).send();

  }
})




/* PATCH Update user in Database */
router.patch('/update/:email', async (req, res) => {

  let email = req.params.email;
  let newPassword = req.body.newPassword;

  try {

    let sql = "UPDATE users SET password=? WHERE email=?";

    conn.query(sql, [newPassword, email], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(400).send();
      }

      return res.status(200).json({
        message: "User password updated successfully!"
      });

    })

  } catch (e) {

    console.log(e);
    return res.status(500).send();

  }

})




/* Delete user from Database */
router.delete('/delete/:email', (req, res) => {

  email = req.params.email;

  try {

    let sql = "DELETE FROM users WHERE email=?";

    conn.query(sql, [email], (err, result) => {

      if (err) {
        console.log(err);
        return res.status(400).send();
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No user with that email"
        });
        
      } else {
        return res.status(200).json({
          message: "User Deleted successfully!"
        });
      }

    })

  } catch (e) {

    console.log(e);
    return res.status(500).send();

  }


})



module.exports = router;
