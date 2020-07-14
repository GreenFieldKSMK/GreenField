const express = require('express');
const db = require('../database/index');
const bodyParser = require('body-parser');
const signUp = db.signUp;
const account = db.account;
const cors = require('cors');
const sendEmail = require('./../components/EmailConf');

////////////////

let app = express();
var port = process.env.port || 4000;

app.use(express.json());
app.use(bodyParser.json());
//app.use(express.static("public"));
app.use(cors());

app.get('/transfer', (req, res) => {
  let state = 0;
  let finalTotal;
  let recieverBalance;
  let recieverCreditcard;
  account.findOne({
    creditcard: req.body.creditcard
  }, function (err, result) {
    if (result) {
      console.log("Sender's obj", result);
      state++;
      if (result.total >= req.body.amount) {
        finalTotal = result.total;
        state++;
      } else {
        console.log("You do not have sufficient balance")
      }
    } else {
      console.log("Invalid creditcard")
    }
  });
  signUp.findOne({
    idnumber: req.body.id
  }, function (err, result) {
    if (result) {
      recieverCreditcard = result.creditcard;
      account.findOne({ creditcard: result.creditcard }, function (err, outcome) {
        if (outcome) {
          recieverBalance = outcome.total;
        }
      })
      console.log("reciever's obj", result);
      state++;
    } else {
      console.log("Invalid reciever")
    }
  });
  if (state === 3) {
    account.findOneAndUpdate({ creditcard: req.body.creditcard }, { total: finalTotal - req.body.amount })
    account.findOneAndUpdate({ creditcard: recieverCreditcard }, { total: recieverBalance + req.body.amount })
    res.send("Success")
  }
  console.log('===================>', 'Hello from the server side!')
})

app.post('/user', (req, res) => {
  var credit = Math.floor(Math.random() * 999999999 + 1000000000);
  console.log(credit);
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
    creditcard: credit,
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
      sendEmail(req.body.email, credit);
    }
  });
});
app.post('/users', (req, res) => {
  let { creditcard, total } = req.body;
  let accountDoc = new account({
    creditcard: creditcard,
    total: total,
  });
  accountDoc.save((err) => {
    if (err) {
      console.log(err);
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
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user');
});

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
