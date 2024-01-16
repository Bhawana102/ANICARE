const express = require("express");
const { urlencoded, query } = require("express");
// var express = require("express");
// var nodemailer = require('nodemailer');
// var fileuploader = require("express-fileupload");
var app = express();

var mysql = require("mysql2");
var path = require("path");
const { report } = require("process");

app.listen(2510, function () {
    console.log("server started");
})
app.use(express.static("public"));


var dbConfiguration =
{
    host: "localhost",
    user: "root",
    password: "Aggarwal@03",
    database: "anicare"
}

var refDB = mysql.createConnection(dbConfiguration);
refDB.connect(function (errobj) {
    if (errobj)
        console.log(errobj);
    else
        console.log("Server connected");
})

//----------------------------------------------
app.get("/prescribe", function (req, resp) {
    var fullpath = process.cwd() + "/public/presc.html";
    resp.sendFile(fullpath);
})
app.get("/symptoms", function (req, resp) {
    var fullpath = process.cwd() + "/public/symptoms.html";
    resp.sendFile(fullpath);
})
app.get("/", function (req, resp) {
    var fullpath = process.cwd() + "/public/index.html";
    resp.sendFile(fullpath);
})

//-----------SIGNUP--------
app.get("/sign", function (req, resp) {
    console.log("heyyyyyyyy");
    var dataAry = [req.query.email, req.query.pwd, 1];
    refDB.query("insert into person values(?,?,?)", dataAry, function (err, result) {
        if (err) {
            alert("error");
            console.log(err);
        }
        else{
         alert("confo");   console.log("inserted successfully");
        }
        resp.send(result);
    })
})
//-----------LOGIN----
app.get("/login", function (req, resp) {
    var ary = [req.query.email, req.query.pwd];
    refDB.query("select * from person where email=? and pwd=? and status=1", ary, function (err, result) {
        if (err) {
            console.log(err);
            console.log("cvbnknjhvhgvjgjyggkuug")
            resp.send(err);
        }
        else
            resp.send(result);
    })
})