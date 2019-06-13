var db = require("../models");

module.exports = function(app) {

    app.post("/api/plants", function(req, res) {
        db.Plant.create(req.body).then(function(dbPlants) {
          res.json(dbPlants);
        });
      });

      app.get("/api/plants/:UserId", function(req, res) {
        db.Plant.findAll({
          where: 
            UserId = req.query.id,
          include: [db.User]
        }).then(function(dbPlant) {
          res.json(dbPlant);
        });
      });

      app.delete("/api/plants/:id", function(req, res) {
        db.Plant.destroy({
          where: {
            id: req.params.id
          }
        }).then(function(dbPlant) {
          res.json(dbPlant);
        });
    
      });

      app.put("/api/plants/:id", function(req, res) {
        db.Plant.update(      
          req.body,
          {
            where: {
              id: req.params.id
            }
          }).then(function(dbPlant) {
          res.json(dbPlant);
        });
      });

      app.get("/api/plants", function(req, res){
        db.Plant.findAll({
          where:
              swap= req.params.swap
          }).then(function(dbPlant){
          res.json(dbPlant)
        });
      });

      app.get("/api/plants/:UserId", function (req, res) {
        db.User.findOne({
            where: {
                UserId: req.params.UserId
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        });
    });
    
  //   app.get("/api/plants/:plant_name", function (req, res) {
  //     db.User.findAll({
  //         where: {
  //             plant_name: req.params.plant_name
  //         }
  //     }).then(function (dbUser) {
  //         res.json(dbUser);
  //     });
  // });


    
}
