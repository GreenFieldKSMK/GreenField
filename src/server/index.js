const express = require('express');
const axios = require('axios');
const db = require('../database/index');
const bodyParser = require('body-parser');
const signUp = db.signUp;
const account = db.account;
const cors = require('cors');
const sendEmail = require('./../components/EmailConf');
//const router = require('./middleware/router');
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
  account.findOne(
    {
      creditcard: req.body.creditcard,
    },
    function (err, result) {
      if (result) {
        console.log("Sender's obj", result);
        state++;
        if (result.total >= req.body.amount) {
          finalTotal = result.total;
          state++;
        } else {
          console.log('You do not have sufficient balance');
        }
      } else {
        console.log('Invalid creditcard');
      }
    }
  );
  signUp.findOne(
    {
      idnumber: req.body.id,
    },
    function (err, result) {
      if (result) {
        recieverCreditcard = result.creditcard;
        account.findOne({ creditcard: result.creditcard }, function (
          err,
          outcome
        ) {
          if (outcome) {
            recieverBalance = outcome.total;
          }
        });
        console.log("reciever's obj", result);
        state++;
      } else {
        console.log('Invalid reciever');
      }
    }
  );
  if (state === 3) {
    account.findOneAndUpdate(
      { creditcard: req.body.creditcard },
      { total: finalTotal - req.body.amount }
    );
    account.findOneAndUpdate(
      { creditcard: recieverCreditcard },
      { total: recieverBalance + req.body.amount }
    );
    res.send('Success');
  }
  console.log('===================>', 'Hello from the server side!');
});
//////////////////////app.use(express.static("public"));
app.use(cors());

// app.use('/user', router);
// app.use('/user/:id', router);

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
            res.send({ number: creditcard, message: 'welcome' });
          })
          .catch((err) => {
            console.log('failed to save acc info', err);
          });
      } else {
        res.send({ message: 'Please enter your credit card number' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send('failed to find user');
    });
});

// app.put('/user', (req, res) => {
//   res.send('Got a PUT request at /user');
// });

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

app.get('/api/change', (req, res) => {
  axios
    .get(
      'http://api.currencylayer.com/live?access_key=056f69d5c345ebe18cb3f2dc73aeda0b'
    )
    .then((result) => {
      res.send(result.data.quotes);
    })
    .catch((err) => {
      console.log('Error', err);
    });
});

app.put('/user', (req, res) => {
  var email = req.params.email;
  var data = req.body;
  signUp
    .updateOne({ email }, data)
    .then((result) => {
      console.log('in put');
      res.status(200).send('save new data'); //,data);
    })
    .catch((err) => {
      console.log('in err');
      res.status(500).send(err);
    });
});
//////////////
app.put('/withdraw', (req, res) => {
  var { creditcard, number } = req.body;
  // var oldTotal;
  account
    .find({ creditcard })
    .then((result) => {
      console.log(result[0]);
      console.log('credit found');
      var newTotal = result[0].total - number;
      result[0].lastwitdraw = result[0].lastwitdraw + number;
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
