require('dotenv').config()
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

console.log("Hello World");

absolutePath = __dirname + '/views/index.html';
stylePath = __dirname + '/public';


app.use("/public", express.static(stylePath));
//Use body-parser to Parse POST Requests
app.use("/", bodyParser.urlencoded({extended: false}));

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// })

app.get("/", function(req,res){
    res.sendFile(absolutePath);
});



// app.use(<mware-function>)
app.use("/", function(req, res, next){
    console.log(req.method + " " + req.path + " - " + req.ip );
    next();
});



app.get("/json", function(req,res){

    if (process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"});
    } 
    else {
        res.json({"message": "Hello json"});
    }
});
// Chain Middleware to Create a Time Server
app.get("/now", function(req,res,next){
    req.time = new Date().toString();
    next();
}, function(req,res){
    res.json({"time": req.time})
});

// Get Route Parameter Input from the Client
app.get("/:word/echo", function(req,res){
    res.json({"echo": req.params.word});
});

//Get Query Parameter Input from the Client
app.route("/name").get( function(req,res){
    res.json({"name": req.query.first + " " + req.query.last});
}).post(function(req,res){
    res.json({"name": req.body.first + " " + req.body.last});
});








 module.exports = app;
