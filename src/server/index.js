const express = require("express");
const db = require("../database/index");         
const signUp = db.signUp;
const account = db.account;                                                    


let app = express();
var port = process.env.port || 4000

app.use(express.json());

app.post('/user',(req,res)=>{
    let {firstname,lastname,email,password,idnumber,age,phonenumber,position,gender}=req.body;
    let sigupDoc = new signUp({firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        idnumber:idnumber,
        age:age,
        phonenumber:phonenumber,
        position:position,
        gender:gender
    });
    sigupDoc.save((err)=>{
        if(err){
            console.log("in err")
            res.status(500).send(err)
        }else{
            res.send('saved new account')
        }
    });
});
app.post('/users',(req,res)=>{
    let {userid,total,lastwitdraw,lastdeposite}=req.body;
    let accountDoc = new account ({
        userid:userid,
        total:total
       });
    accountDoc.save((err)=>{
        if(err){
            console.log("in err")
            res.status(500).send(err)
        }else{
            res.send('saved new account')
        }
    });
})











app.listen(port,()=>{
    console.log(`listening on ${port}`)
})


