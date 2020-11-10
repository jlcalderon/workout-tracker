const db = require("../models");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
            .then(dbWorkouts => {
                res.json(dbWorkouts);
            })
            .catch(err => {
                res.json(err);
            });
    });
    app.get("/api/exercise", (req, res) => {
        db.Exercise.find({})
            .then(dbExercise => {
                res.json(dbExercise);
            })
            .catch(err => {
                res.json(err);
            });
    });

}


//Code examples of interacting with mongoDB using Mongoose
/* db.Library.create({ name: "Campus Library" })
  .then(dbLibrary => {
    console.log(dbLibrary);
  })
  .catch(({message}) => {
    console.log(message);
  }); */

/* app.post("/submit", ({body}, res) => {
  db.Book.create(body)
    .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
}); */

/* app.get("/library", (req, res) => {
  db.Library.find({})
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
}); */

/* app.get("/populated", (req, res) => {
  db.Library.find({})
    .populate("books")
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
}); */