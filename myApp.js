require('dotenv').config()
let express = require('express');
let app = express();

console.log("Hello World");

absolutePath = __dirname + '/views/index.html';
stylePath = __dirname + '/public';


app.use("/public", express.static(stylePath));

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// })

app.get("/", function(req,res){
    res.sendFile(absolutePath);
});

app.get("/json", function(req,res){

    if (process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"});
    } 
    else {
        res.json({"message": "Hello json"});
    }
});









 module.exports = app;
