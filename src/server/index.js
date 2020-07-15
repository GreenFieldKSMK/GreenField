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
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//////////////////////////////////////////////////////////////////

app.get('/transfer', (req, res) => {
  let { creditcard, id, amount } = req.query;
  amount = Number(amount);
  let reciever;
  let sender;
  let recieverAcc;
  let senderAcc;
  account.findOne({ creditcard })
    .then(result => {
      if (result !== null) {
        sender = result.total
        signUp.findOne({ idnumber: id })
          .then(result => {
            if (result !== null) {
              let credit = result.creditcard;
              account.findOne({ creditcard: credit })
                .then(result => {
                  if (result !== null) {
                    recieverAcc = result;
                    reciever = result.total;
                    if (sender - amount > 0) {
                      sender = sender - amount;
                      reciever = reciever + amount;
                      account.updateOne({ creditcard }, { $set: { total: sender } })
                        .then(result => {
                          let creditNum = recieverAcc.creditcard
                          account.updateOne({ creditcard: creditNum }, { $set: { total: reciever } })
                            .then(result => {
                              res.send(`Successfully transfered ${amount}`);
                            })
                            .catch(err => {
                              console.log(err, "Reciever update")
                            })

                        })
                        .catch(err => {
                          console.log(err, "Sender update")
                        })
                    } else {
                      res.send("insufficient balance!")
                    }
                  } else {
                    res.send("Cannot find reciever's credit card")
                  }
                })
                .catch(err => {
                  console.log(err, "Failed to find reciever!")
                })
            } else {
              res.send("Reciever ID doesn't exist")
            }
          })
          .catch(err => {
            console.log(err, "Failed to find reciever ID!")
          })
      } else {
        res.send("Invalid sender credit card!")
      }
    })
    .catch(err => {
      console.log(err, "Failed to reach sender credit card!")
    })
})



///////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////

app.put('/withdraw', (req, res) => {
  var { creditcard, number } = req.body;

  account
    .find({ creditcard })
    .then((result) => {
      console.log('credit found for update');
      if (result.length !== 0) {
        if (result[0].total - number > 0) {
          var newTotal = result[0].total - number;
          var withdraw = result[0].lastwitdraw + number;
          account
            .update(
              { creditcard: creditcard },
              { $set: { total: newTotal, lastwitdraw: withdraw } },
              { upsert: true }
            )
            .then((result) => {
              res.send(`Successfully Withdrew ${number}`);
              console.log('info updated');
            })
            .catch((err) => {
              console.log('cannot update ==========>', err);
            });
        } else {
          res.send(`Insufficiant Expenses! Cannot withdraw ${number}`);
        }
      } else {
        res.send('Cannot Find the number provided');
      }
    })
    .catch((err) => {
      console.log('failed to find credit to update', err);
    });
});

/////////////////////////////////////////////////////////////////////

app.put('/deposit', (req, res) => {
  var { creditcard, number } = req.body;

  account
    .find({ creditcard })
    .then((result) => {
      console.log('credit found for update');
      if (result.length !== 0) {
        var newTotal = result[0].total + number;
        var deposit = result[0].lastdeposite + number;
        account
          .update(
            { creditcard: creditcard },
            { $set: { total: newTotal, lastdeposite: deposit } },
            { upsert: true }
          )
          .then((result) => {
            res.send(`Successfully deposited ${number}`);
            console.log('info updated');
          })
          .catch((err) => {
            console.log('cannot update ==========>', err);
          });
      } else {
        res.send('Cannot Find the number provided');
      }
    })
    .catch((err) => {
      console.log('failed to find credit to update', err);
    });
});

///////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`listening on ${port}`);
});


// account.findOne({
//   creditcard: req.body.creditcard
// }, function (err, result) {
//   console.log(result)
//   if (result) {
//     console.log("Sender's obj", result);
//     state++;
//     if (result[0].total >= req.body.amount) {
//       finalTotal = result.total;
//       state++;
//     } else {
//       console.log("You do not have sufficient balance")
//     }
//   } else {
//     console.log("Invalid creditcard")
//   }
// });