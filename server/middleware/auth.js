const { userModel: User } = require("../models/userModel");

let auth = (req, res, next) => {
  let token = req.cookies.mel_auth;
  if (token === undefined) {
    return res.json({
      isAuth: false,
      isLoading: false,
      error: "No token found",
    });
  } else {
    User.findByToken(token, (err, user) => {
      if (err) throw err;

      if (!user)
        return res.json({
          isAuth: false,
          isLoading: false,
          error: "No user found",
        });

      req.token = token;
      req.user = user;
      next();
    });
  }
};

module.exports = { auth };
