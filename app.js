const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
const https = require("https");
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/22b28dbf07";
  const options = {
    method: "POST",
    auth: "affan:88632dc8c82d39d3632334850eef7506-us5"
  }
  const request = https.request(url, options, function(response) {


    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");

    }else{

        res.sendFile(__dirname + "/failure.html");

    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
request.write(jsonData);
request.end();

})
app.post("/failure", function(req, res){
  res.redirect("/");
})
// apikey
//88632dc8c82d39d3632334850eef7506-us5
// unique key
// 22b28dbf07
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started and running on port 3000")
})
