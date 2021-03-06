const express = require("express");
const router = express.Router();
const { userModel: User } = require("../models/userModel");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.put("/update", (req, res) => {
  User.findOneAndUpdate({ email: req.body.email }, req.body, {
    new: true,
  }).exec((err, user) => {
    if (err) return res.json({ message: err });
    return res.status(200).json({ user });
  });
});

router.delete("/delete", (req, res) => {
  User.findOneAndDelete(req.body).exec((err) => {
    if (err) return res.json({ message: err });
    return res.status(200).json({ message: "Success" });
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

  User.find(keywords, (err, users) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(users);
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    grade: req.user.grade,
    role: req.user.role,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    isLoading: false,
  });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, userInfo) => {
    if (err) return res.status(400).send(err);

    if (userInfo) {
      return res.json({
        success: false,
        message: "E-mail already exists!",
      });
    }

    const user = new User(req.body);

    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err });

      return res.status(200).json({
        success: true,
        userInfo,
      });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).send(err);

    if (!user) {
      return res.json({
        info: {
          isAuth: false,
          isLoading: false,
        },
        loginSuccess: false,
        message: "No matched email found!",
      });
    }

    user.comparePassword(req.body.password, (err, isMatched) => {
      if (err) return res.status(400).send(err);

      if (!isMatched) {
        return res.json({
          info: {
            isAuth: false,
            isLoading: false,
          },
          loginSuccess: false,
          message: "Password is wrong!",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("mel_authExp", user.tokenExp);
        res
          .cookie("mel_auth", user.token)
          .status(200)
          .json({
            info: {
              _id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              grade: user.grade,
              role: user.role,
              isAdmin: user.role === 0 ? false : true,
              isAuth: true,
              isLoading: false,
            },
            loginSuccess: true,
          });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
