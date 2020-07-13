const express = require('express');
const db = require('../database/index');
const signUp = db.signUp;
const account = db.account;
const cors = require('cors');

////////////////

let app = express();
var port = process.env.port || 4000;

app.use(express.json());
//app.use(express.static("public"));
app.use(cors());

app.post('/user', (req, res) => {
  let {
    firstname,
    lastname,
    email,
    password,
    idnumber,
    age,
    phonenumber,
    occupation,
    gender,
  } = req.body;
  let sigupDoc = new signUp({
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password,
    idnumber: idnumber,
    age: age,
    phonenumber: phonenumber,
    occupation: occupation,
    gender: gender,
  });
  sigupDoc.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('saved new account');
      console.log('User saved!');
    }
  });
});
app.post('/users', (req, res) => {
  let { userid, total } = req.body;
  let accountDoc = new account({
    userid: userid,
    total: total,
  });
  accountDoc.save((err) => {
    if (err) {
      console.log('in err');
      res.status(500).send(err);
    } else {
      console.log('account info saved');
      res.send('saved new account');
    }
  });
});
// app.put('/userss/:userid',(req,res)=>{
//     let userid = req.params.userid
//     let lastdeposite = req.params.lastdeposite
//     account.find({userid:userid})
//     .then((result)=>{
//        res.send(app.post(lastdeposite))
//     }) 
    
//     .catch((err)=>{
//         console.log("user not faund")
//     }) 
// })
// finde one and update data in mongodb ubdet 
app.put('/user',(req, res)=>{
    res.send('Got a PUT request at /user')
  })


app.get('/user/:email/:password', (req, res) => {
  var { email, password } = req.params;
  signUp
    .find({ email: email, password: password })
    .then((result) => {
      res.send(result);
      console.log('successfully fount the user');
    })
    .catch((err) => {
      console.log('could not find user');
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
