const singupRouter = require('express').Router();
const controllers = require('./controllers');

singupRouter
  .route('/user')
  .post(controllers, { signUp, account })
  ///////////////
  .route('/user/:id')
  .put(controllers, updateOne);

module.exports = singupRouter;
