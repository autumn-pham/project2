const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  date: { type: String, required: true },
  activity: { type: String, required: true },
  type: { type: String, required: true },
  weight: { type: String, required: true },
  time: { type: String, required: true },
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
