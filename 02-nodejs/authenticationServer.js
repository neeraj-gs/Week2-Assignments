/**
  You need to create a HTTP server in Node.js which will handle the logic of an authentication server.
  - Don't need to use any database to store the data.

  - Save the users and their signup/login data in an array in a variable
  - You can store the passwords in plain text (as is) in the variable for now

  The expected API endpoints are defined below,
  1. POST /signup - User Signup
    Description: Allows users to create an account. This should be stored in an array on the server, and a unique id should be generated for every new user that is added.
    Request Body: JSON object with username, password, firstName and lastName fields.
    Response: 201 Created if successful, or 400 Bad Request if the username already exists.
    Example: POST http://localhost:3000/signup

  2. POST /login - User Login
    Description: Gets user back their details like firstname, lastname and id
    Request Body: JSON object with username and password fields.
    Response: 200 OK with an authentication token in JSON format if successful, or 401 Unauthorized if the credentials are invalid.
    Example: POST http://localhost:3000/login

  3. GET /data - Fetch all user's names and ids from the server (Protected route)
    Description: Gets details of all users like firstname, lastname and id in an array format. Returned object should have a key called users which contains the list of all users with their email/firstname/lastname.
    The users username and password should be fetched from the headers and checked before the array is returned
    Response: 200 OK with the protected data in JSON format if the username and password in headers are valid, or 401 Unauthorized if the username and password are missing or invalid.
    Example: GET http://localhost:3000/data

  - For any other route not defined in the server return 404

  Testing the server - run `npm run test-authenticationServer` command in terminal
 */

const express = require("express")
// const PORT = 3000;
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
// write your logic here, DONT WRITE app.listen(3000) when you're running tests, the tests will automatically start the server

app.use(bodyParser.json());
// module.exports = app;

const users = [];
var id_c = 0;


//any one of the user pasword and email is verified then all teh uesrs are dispalyed
app.get("/data", (req, res) => {
  var email = req.headers.email;
  var password = req.headers.password;
  let userFound = false;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
        userFound = true;
        break;
    }
  }

  if (userFound) {
    let usersToReturn = [];
    for (let i = 0; i<users.length; i++) {
        usersToReturn.push({
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            email: users[i].email
        });
    }
    res.json({
        users
    });
  } else {
    res.sendStatus(401);
  }
});


app.post('/signup',(req,res)=>{
  id_c+=1;
  var user = {
    id:id_c,
    username:req.body.username,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email

  }
  var exist = users.find(user=>user.username === req.body.username)
  if(exist){
    res.status(404).send(`Username Already Exists`)
  }else{
    users.push(user);
    res.status(201).send(user);
  }

})



app.post("/login", (req, res) => {
  var user = req.body;
  let userFound = null;
  for (var i = 0; i<users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
        userFound = users[i];
        break;
    }
  }

  if (userFound) {
    res.json({
        id:userFound.id,
        firstName: userFound.firstname,
        lastName: userFound.lastname,
        email: userFound.email
    });
  } else {
    res.sendStatus(401);
  }
});










app.listen(port,()=>{
  console.log(`App is listening on port:${port}`);
})




