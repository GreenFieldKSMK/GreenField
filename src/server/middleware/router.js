const signupRouter = require('express').Router();
const controllers = require('./controllers');
///////////////
signupRouter
  .route('/user')
  .post(controllers.signUp)

  .get(controllers.retrieve);
///////////////
signupRouter
  .route('/user/:id')
  .post(controllers.account)
  .put(controllers.updateOne)
  .get(controllers.retrieveOne);

module.exports = signupRouter;
