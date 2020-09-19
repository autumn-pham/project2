const express = require('express')
const Workout = require('../models/workouts.js')
const workouts = express.Router()
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// NEW

workouts.get('/new', (req, res)=>{
    res.render('workouts/new.ejs')
    ,
    {currentUser: req.session.currentUser}
});

// EDIT

workouts.get('/:id/edit', (req, res)=>{
  if (req.session.currentUser) {
    Workout.findById(req.params.id, (err, foundWorkout)=>{
      res.render(
      	'workouts/edit.ejs',
      		{
      			workout: foundWorkout
            ,
            currentUser: req.session.currentUser
      		})
        })
      } else {
        res.redirect('/sessions/new')
    }
});

// DELETE
workouts.delete('/:id', (req, res) => {
  Workout.findByIdAndRemove(req.params.id, (err, deletedWorkout) => {
    res.redirect('/workouts')
  })
})

// SHOW

workouts.get('/:id', (req, res)=>{
  Workout.findById(req.params.id, (error, foundWorkout)=>{
    res.render('workouts/show.ejs', {
      workout: foundWorkout,
      currentUser: req.session.currentUser
    });
  });
});


// UPDATE

workouts.put('/:id', (req, res)=>{
  Workout.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel)=>{
    res.redirect('/workouts');
  });
});

// CREATE

workouts.post('/', (req, res)=>{
  if (req.body.type === 'cardio') {
    req.body.type = 'cardio'
  } else if (req.body.type === 'strength training') {
    req.body.type = 'strength training'
  } else {
    req.body.type = 'static stretching'
  }
  Workout.create(req.body, (error, createdWorkout)=>{
    res.redirect('/workouts');
  });
});

// INDEX

workouts.get('/', (req, res) =>{
  Workout.find({}, (error, allWorkouts)=>{
      res.render('workouts/index.ejs', {
        workouts: allWorkouts
        ,
        currentUser: req.session.currentUser
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
