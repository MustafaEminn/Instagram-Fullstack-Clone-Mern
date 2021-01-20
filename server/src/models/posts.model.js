"use strict";
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsNumber: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
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

postsSchema.statics = {
  // async findEmail(email) {
  //   const user = await this.findOne({ email }).exec();
  //   if (!user) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // },
  // async findUsername(username) {
  //   const user = await this.findOne({ username }).exec();
  //   if (!user) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // },
};

module.exports = mongoose.model("Posts", postsSchema);
