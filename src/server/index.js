const express = require("express");
 

let app = express();

app.use(express.json());
app.use(express.static("public"));
var port = process.env.port || 3000





app.listen(port,()=>{
    console.log(`listening on ${port}`)
})


