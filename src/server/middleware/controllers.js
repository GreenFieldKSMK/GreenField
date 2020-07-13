const signUp  = require('./../../database/index');
const account = require('./../../database/index');


exports.createOneSignUp = function (req, res) {
   var data=req.body;
    const signUpDoc = new signUp(data);
     signUpDoc.save().then((result)=>{
       res.json(result)
     })
     .catch((err)=>{
         console.log('errrr',err)
       res.status(500)
     })
};

exports.createOneAccount = function (req, res) {
    var data=req.body;
     const accountDoc = new account(data);
      accountDoc.save().then((result)=>{
        res.json(result)
      })
      .catch((err)=>{
          console.log('errrr',err)
        res.status(500)
      })
 };


// var query = {'username': req.user.username};
// req.newData.username = req.user.username;

// MyModel.findOneAndUpdate(query, req.newData, {upsert: true}, function(err, doc) {
//     if (err) return res.send(500, {error: err});
//     return res.send('Succesfully saved.');
// });


exports.updateOne = function (req, res) {
    account.findOneAndUpdate(req.params.name, { $set: req.body }, (err,account)=> {
      if (err) return res.send(err);
      res.send("account udpated.");
    });
  };


  exports.retrieve = function (req, res) {
    signUpDoc.find({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  };