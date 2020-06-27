const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      maxlength: 50,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    optionOne: {
      type: String,
      required: true,
    },
    optionTwo: {
      type: String,
      required: true,
    },
    optionThree: {
      type: String,
      required: true,
    },
    optionFour: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const questionModel = mongoose.model("Question", questionSchema);

module.exports = { questionModel };
