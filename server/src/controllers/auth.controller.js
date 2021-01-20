"use strict";

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt-nodejs");

exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const newBody = {
      ...body,
      password: bcrypt.hashSync(body.password, config.hashKey),
    };
    const user = new User(newBody);
    await user.save();
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
    return next(User.checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    if (user) {
      const payload = { sub: user.id };
      const token = jwt.sign(payload, config.secret, { expiresIn: "1h" });
      return res.send({ success: true, message: "OK", token: token });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({ success: false });
    next(error);
  }
};

exports.checkEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findEmail(email);
    res.send({ success: user });
  } catch (error) {
    next(error);
  }
};

exports.checkUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findUsername(username);
    res.send({ success: user });
  } catch (error) {
    next(error);
  }
};
