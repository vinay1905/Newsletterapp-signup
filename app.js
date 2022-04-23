//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
const { write } = require("fs");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    

    res.sendFile(__dirname + "/signup.html");
});

app.post("/signuppage", function(req, res){

    const FisrtName = req.body.fname ;
    const LastName = req.body.lname ;
    const Email = req.body.email ;

    const data = {
        members:[
        {
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: FisrtName,
                LNAME: LastName
            }
        }
        ]
    };


    const JsonData = JSON.stringify(data); //converting above data 

    const url = "https://us14.api.mailchimp.com/3.0/lists/215da08058";

    const options ={
        method: "POST",
        auth: "vinuvg:54675e49776242877f1d122384a41215-us14"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));

            console.log(response.statusCode);
        });
    });
    


    request.write(JsonData);
    request.end();
    
});


app.post("/failure", function(req, res){
    res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is Running on Port 3000");
});

// API Key
// 54675e49776242877f1d122384a41215-us14

// list id
// 215da08058