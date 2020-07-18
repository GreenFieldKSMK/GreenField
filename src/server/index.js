const express = require('express');
const axios = require('axios');
const db = require('../database/index');
const signUp = db.signUp;
const account = db.account;
const cors = require('cors');
const sendEmail = require('./../components/EmailConf');

////////////////

let app = express();
var port = process.env.port || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//////////////////////////////////////////////////////////////////

app.get('/profile/:creditcard', (req, res) => {
  var { creditcard } = req.params;
  account
    .findOne({ creditcard: creditcard })
    .then((result) => {
      if (result !== null) {
        res.send(result);
      } else {
        res.send({ message: 'Invalid Credit Card!' });
      }
    })
    .catch((err) => {
      res.send(err);
      console.log('error in finding for display======>', err);
    });
});

app.get('/transfer', (req, res) => {
  let { creditcard, id, amount } = req.query;
  amount = Number(amount);
  let reciever;
  let sender;
  let recieverAcc;
  account
    .findOne({ creditcard })
    .then((result) => {
      if (result !== null) {
        sender = result.total;
        signUp
          .findOne({ idnumber: id })
          .then((result) => {
            if (result !== null) {
              let credit = result.creditcard;
              account
                .findOne({ creditcard: credit })
                .then((result) => {
                  if (result !== null) {
                    recieverAcc = result;
                    reciever = result.total;
                    if (sender - amount > 0) {
                      sender = sender - amount;
                      reciever = reciever + amount;
                      account
                        .updateOne({ creditcard }, { $set: { total: sender } })
                        .then((result) => {
                          let creditNum = recieverAcc.creditcard;
                          account
                            .updateOne(
                              { creditcard: creditNum },
                              { $set: { total: reciever } }
                            )
                            .then((result) => {
                              res.send(`Successfully transfered ${amount}`);
                            })
                            .catch((err) => {
                              console.log(err, 'Reciever update');
                            });
                        })
                        .catch((err) => {
                          console.log(err, 'Sender update');
                        });
                    } else {
                      res.send('insufficient balance!');
                    }
                  } else {
                    res.send("Cannot find reciever's credit card");
                  }
                })
                .catch((err) => {
                  console.log(err, 'Failed to find reciever!');
                });
            } else {
              res.send("Reciever ID doesn't exist");
            }
          })
          .catch((err) => {
            console.log(err, 'Failed to find reciever ID!');
          });
      } else {
        res.send('Invalid credit card!');
      }
    })
    .catch((err) => {
      console.log(err, 'Failed to reach sender credit card!');
    });
});

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
            res.send({ number: creditcard });
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
      if (result.length !== 0) {
        res.send({
          firstname: result[0].firstname,
          lastname: result[0].lastname,
          age: result[0].age,
          date: result[0].date,
          email: result[0].email,
          password: result[0].password,
          // message: 'WELCOME',
        });
      } else {
        res.send({ message: 'Incorrect Email/ Password, please re-enter' });
      }
    })
    .catch((err) => {
      console.log('error in signing in', err);
    });
});

////////////////////////////////////////////////////////////////

app.get('/api/change', (req, res) => {
  axios
    .get(
      'http://api.currencylayer.com/live?access_key=8b428808e220c71b4622a3c5b1f7f672'
    )
    .then((result) => {
      console.log(result.data.quotes);
      res.send(result.data.quotes);
    })
    .catch((err) => {
      console.log('Error', err);
    });
});

/////////////////////////////////////////////////////////////////

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
              { $set: { total: newTotal, lastwitdraw: number } },
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
          res.send(`Insufficiant Balance! Cannot withdraw ${number}`);
        }
      } else {
        res.send('Invalid Credit card');
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
            { $set: { total: newTotal, lastdeposite: number } },
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
        res.send('Invalid Credit Card');
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
