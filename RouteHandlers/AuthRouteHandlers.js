const Authmodel = require("../Model/AuthModel");
const JWT = require("jsonwebtoken");
const utils = require("util");
const crypto = require("crypto");
const ResetPassFunction = require("../Mailtrap/email");

const SignToken = (id) => {
  return JWT.sign({ id }, process.env.SECRET_KEY);
};

exports.RegisterUser = async (req, res) => {
  try {
    const { email } = req.body;
    //Check if the user exist with the same email
    const user = await Authmodel.findOne({ email });

    if (user) {
      res.status(401).json({
        status: "failed",
        message: "Email Alreadt Exist",
      });
    }
    const response = await Authmodel.create(req.body);
    const token = SignToken(response.id);

    res.status(201).json({
      status: "Success",
      message: "User Created Successfully",
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if the user exist with the same email
    const user = await Authmodel.findOne({ email });

    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "Email Not Found",
      });
    }

    const validatePass = await user.comparePass(password, user.password);
    if (!validatePass) {
      res.status(401).json({
        status: "failed",
        message: "Invalid Password",
      });
    }
    const token = SignToken(user.id);
    res.status(200).json({
      status: "success",
      message: "User Login successfully",
      token,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};
exports.forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Authmodel.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "user Not Found",
      });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    const hashedtoken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetpasstoken = hashedtoken;
    user.resetpasstokenexpires = Date.now() + 10 * 60 * 1000

    await user.save();

    ResetPassFunction.sendResetEmail(
      email,
      `127.0.0.1:3000/ezyskills/resetpassword/${resetToken}`
    );
    res.status(201).json({
      status: "success",
      message: "password reset token generated",
    });
  } catch (err) {
    console.log(e);
    res.status(404).json({
      status: "failed",
      message: e.message,
    });
  }
};
exports.resetpassword = async (req, res) => {
  try {
    const token = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
     console.log(token)
    const user = await Authmodel.findOne({
      resetpasstoken: token , resetpasstokenexpires : {$gt : Date.now()}});

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found or token expired",
      });
    }


    user.password = req.body.password;
    user.confirmpassword = req.body.password;
    user.resetpasstoken = undefined;
    user.resetpasstokenexpires = undefined;

    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (e) {
    console.log(e)
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
};

exports.ProtectRoutes = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let key;
    if (token && token.startsWith("Bearer")) {
      key = token.split(" ")[1];
    }
    if (!token) {
      res.status(400).json({
        status: "Failed",
        message: "Invalid Token",
      });
      next();
    }
    const decodedToken = await utils.promisify(JWT.verify)(
      key,
      process.env.SECRET_KEY
    );
    console.log(decodedToken);

    const user = await Authmodel.findById(decodedToken.id);
    if (!user) {
      res.status(400).json({
        status: "Failed",
        message: "User Not Found",
      });
      next();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "Unauthorized access",
      error: err.message,
    });
  }
};
