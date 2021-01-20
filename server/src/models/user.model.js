"use strict";
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config");
const Schema = mongoose.Schema;

const roles = ["user", "admin"];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 128,
    },
    username: {
      type: String,
      maxlength: 50,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      maxlength: 50,
    },
    role: {
      type: String,
      default: "user",
      enum: roles,
    },
    createdAt: {
      type: Date,
      default: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics = {
  roles,

  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      var error = new Error("Email already taken");
      error.errors = [
        {
          field: "email",
          location: "body",
          messages: ["Email already taken"],
        },
      ];
      error.status = httpStatus.CONFLICT;
      return error;
    }
    return err;
  },

  async findAndGenerateToken(payload) {
    const { email, password } = payload;

    if (!email) throw new APIError("Email must be provided for login");
    const pass = bcrypt.hashSync(password, config.hashKey);

    const user = await this.findOne({ email }).exec();
    if (user.password === pass) {
      return user;
    } else {
      return false;
    }
  },

  async findEmail(email) {
    const user = await this.findOne({ email }).exec();
    if (!user) {
      return false;
    } else {
      return true;
    }
  },

  async findUsername(username) {
    const user = await this.findOne({ username }).exec();
    if (!user) {
      return false;
    } else {
      return true;
    }
  },
};

module.exports = mongoose.model("Users", userSchema);
