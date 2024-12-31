const Authmodel = require("../Model/AuthModel");
const JWT = require("jsonwebtoken");
const utils = require("util");

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

exports.ProtectRoutes = async (req, res, next) => {
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
      message: "Invalid Token",
    });
    next();
  }
  
};
