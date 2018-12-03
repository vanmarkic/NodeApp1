const express = require("express");
// import the NPM dependancy package


const jsonfile = require('jsonfile')
const file_path = "./DB/users.json";
jsonfile.readFile(file_path, function (err, obj) {
      console.dir('obj:' + obj)
})

module.exports = function (app) {
      app.get("/users", (req, res) => {


            // jsonfile reading
            jsonfile.readFile("./DB/users.json", function (err, content) {
                  // send file contents back to sender
                  res.send(content);
                  console.log("fetching all users");
            });
      });
      // code here



      app.post("/users/new", (req, res) => {

            let {
                  email,
                  username
            } = req.body;

            jsonfile.readFile(file_path, function (err, content) {

                  content.push({
                        email,
                        username
                  });

                  console.log("added " + email + "to DB");

                  jsonfile.writeFile(file_path, content, function (err) {
                        console.log(err);
                  });

                  res.sendStatus(200);
            });
      });

      app.delete("/users/destroy", (req, res) => {

            let email = req.body.email;

            jsonfile.readFile(file_path, function (err, content) {

                  for (var i = content.length - 1; i >= 0; i--) {

                        if (content[i].email === email) {
                              console.log("removing " + content[i].email + "from DB");
                              content.pop(i);
                        }

                  }

                  jsonfile.writeFile(file_path, content, function (err) {
                        console.log(err);
                  });

                  res.sendStatus(200);
            });
      });

      app.put("/user", (req, res) => {
            let user;
            let username = req.body.username;
            let email = req.query.email;

            jsonfile.readFile(file_path, function (err, content) {
                  for (var i = content.length - 1; i >= 0; i--) {
                        if (content[i].email === email) {

                              console.log("updated user " + email + " has now username : " + username);

                              user = content[i];
                              user.username = username;

                        }
                  }

                  jsonfile.writeFile(file_path, content, function (err) {
                        console.log(err);
                  });

            });
            res.send(user);
      });

      app.get("/user", (req, res) => {
            let user;
            let email = req.query.email;

            jsonfile.readFile(file_path, function (err, content) {
                  for (var i = content.length - 1; i >= 0; i--) {
                        if (content[i].email === email) {
                              console.log("found user" + content[i]);
                              console.log(content[i]);
                              user = content[i];
                        }
                  }

                  res.send(user);
            });
      });
}