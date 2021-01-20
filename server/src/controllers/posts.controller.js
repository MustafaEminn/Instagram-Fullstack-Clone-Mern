"use strict";

const Posts = require("../models/posts.model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcrypt-nodejs");
const postsImageModel = require("../models/postsImage.model");
const fs = require("fs");

exports.createPost = async (req, res, next) => {
  try {
    const body = req.body;
    const user = new Posts(body);
    await user.save();
    res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({ success: false });
  }
};

exports.createPostImage = async (req, res, next) => {
  try {
    const image = new postsImageModel();
    console.log(req.files[0].path);
    image.img.data = fs.readFileSync(req.files[0].path);
    image.img.contentType = "image/png";
    await image.save();
    return res.status(200).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.send({ success: false });
  }
};

exports.deletePost = async (req, res, next) => {
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
