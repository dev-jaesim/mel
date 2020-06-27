const express = require("express");
const router = express.Router();
const { questionModel: Question } = require("../models/questionModel");

router.post("/add", (req, res) => {
  const question = new Question(req.body);

  question.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.get("/", (req, res) => {
  let keywords = {};
  for (k in req.query) {
    if (
      req.query[k] !== "null" &&
      req.query[k] !== "undefined" &&
      req.query[k] !== ""
    ) {
      keywords[k] = req.query[k];
    }
  }

  Question.find(keywords, (err, questions) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(questions);
  });
});

router.put("/update", (req, res) => {
  Question.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
  }).exec((err, question) => {
    if (err) return res.json({ message: err });
    return res.status(200).json({ question });
  });
});

router.delete("/delete", (req, res) => {
  Question.findOneAndDelete(req.body).exec((err) => {
    if (err) return res.json({ message: err });
    return res.status(200).json({ message: "Success" });
  });
});

module.exports = router;
