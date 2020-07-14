const express = require('express');
const db = require('../database/index');
const signUp = db.signUp;
const account = db.account;
const cors = require('cors');
const sendEmail = require('./../components/EmailConf');

////////////////

let app = express();
var port = process.env.port || 4000;

app.use(express.json());
//app.use(express.static("public"));
app.use(cors());

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
  signUp
    .find({ creditcard: creditcard })
    .then((result) => {
      if (result.length !== 0) {
        accountDoc
          .save()
          .then((result) => {
            console.log('account successfully saved');
            res.send('Welcome');
          })
          .catch((err) => {
            console.log('failed to save acc info', err);
          });
      } else {
        res.send('Please enter your credit card number');
      }
    })
    .catch((err) => {
      res.send('failed to find user');
    });
});

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
