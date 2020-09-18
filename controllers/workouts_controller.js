const express = require('express')
const Workout = require('../models/workouts.js')
const workouts = express.Router()

// NEW

workouts.get('/new', (req, res)=>{
    res.render('workouts/new.ejs');
});

// EDIT

// DELETE



// UPDATE

// CREATE

// SHOW

workouts.get('/:id', (req, res)=>{
  Workout.findById(req.params.id, (error, foundWorkout)=>{
    res.render('workouts/show.ejs', {
      workout: foundWorkout
    });
  });
});

// INDEX

workouts.get('/', (req, res) =>{
  Workout.find({}, (error, allWorkouts)=>{
      res.render('workouts/index.ejs', {
        workouts: allWorkouts
      });
  });
});

// SEED

workouts.get('/seed', (req, res) => {
  Workout.create(
    [
      {
        date: 'Sept 1',
        activity: 'stairs run',
        type: 'cardio',
        weight: 100,
        time: 30
      },
      {
        date: 'Sept 2',
        activity: 'Muay Thai',
        type: 'cardio',
        weight: 100,
        time: 60
      },
      {
        date: 'Sept 4',
        activity: 'legs day',
        type: 'weight training',
        weight: 100,
        time: 45
      },
      {
        date: 'Sept 5',
        activity: 'stairs run',
        type: 'cardio',
        weight: 100,
        time: 30
      },
      {
        date: 'Sept 6',
        activity: 'chest and shoulders',
        type: 'weight training',
        weight: 100,
        time: 40
      }
    ],
    (error, data) => {
      res.redirect('/workouts')
  })
})




// DROP DB ROUTE

module.exports = workouts
