const { Mongoose } = require("mongoose");
const db = require("../models");
const path = require("path");

module.exports = function (app) {
  //Create a workout
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create({
      day: Date.now(),
    })
      .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch(({ message }) => {
        console.log(message);
      });
  });
  //Get last workout
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  //Add exercise
  app.post("/api/workouts/:id", (req, res) => {
    // Create a new object from request body
    let exercises = req.body;
    db.Workout.findOneAndUpdate(
      {
        //Targeting the match id
        _id: req.params.id,
      },
      {
        //Pushing to the exercise column array
        $push: {
          exercises: {
            name: exercises.name,
            type: exercises.type,
            weight: exercises.weight,
            sets: exercises.sets,
            reps: exercises.reps,
            duration: exercises.duration,
            distance: exercises.distance,
          },
        },
      },
      { new: true }
    )
      .then((dbWorkoutPlan) => {
        res.json(dbWorkoutPlan);
      })
      .catch((err) => {
        console.log(`There is an error on: ${err}`);
        res.json(err);
      });
  });

  //Get exercise range
  app.get("/api/workouts/range", (req, res) => {
    const startDate = new Date().setDate(new Date().getDate());
    const endDate = new Date().setDate(new Date().getDate() - 7);
    db.Workout.find({
      day: { $gte: endDate.toString(), $lte: startDate.toString() },
    })
      .sort({ day: 1 })
      .then((dbWorkoutRange) => {
        res.json(dbWorkoutRange);
      })
      .catch((err) => {
        console.log(`Range query error on: ${err}`);
        res.json(err);
      });
  });
};
