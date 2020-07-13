const singupRouter = require('express').Router();
const controllers = require('./controllers')
// let{createOne,createOne,updateOne}=require('./controllers');
.route('/user')
.post(controllers,{createOneSignUp,createOneAccount})
.get(controllers,retrieve)
.route('/user/:id')

.put(controllers,updateOne);


module.exports =singupRouter;