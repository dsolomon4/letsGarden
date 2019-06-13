var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res){
    db.User.findAll({
    }).then(function(dbUser){
      res.json(dbUser)
    });
  });

  app.get("/api/users/:email", function (req, res) {
    db.User.findOne({
        where: {
            email: req.params.email
        }
    }).then(function (dbUser) {
        res.json(dbUser);
    });
});

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Plant]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  // app.get("/api/users/:id", function(req, res) {
  //   db.User.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.Plant]
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
}




