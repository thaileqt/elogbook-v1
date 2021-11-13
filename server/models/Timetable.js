/** @format */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
  week: {
    type: Number,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: "class",
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "school",
  },
  acedemicyear: {
    type: Schema.Types.ObjectId,
    ref: "academicyear",
    required: true,
  },
});

module.exports = mongoose.model("timetable", TimetableSchema);