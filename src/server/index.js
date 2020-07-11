const express = require("express");
 

let app = express();

app.use(express.json());

var port = process.env.port || 4000




app.listen(port,()=>{
    console.log(`listening on ${port}`)
})


