const signUp = require('./../../database/index');
const account = require('./../../database/index');

exports.signUp = (req, res) => {
  var credit = Math.floor(Math.random() * 999999999 + 1000000000);
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
};

exports.account = (req, res) => {
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
};

exports.updateOne = function (req, res) {
  var userid = req.params.userid;
  var data = req.body;
  account
    .updateOne({ userid }, data)
    .then((result) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
