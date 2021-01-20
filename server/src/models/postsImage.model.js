"use strict";
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const APIError = require("../utils/APIError");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config");
const Schema = mongoose.Schema;

const postsImageSchema = new Schema(
  {
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("postsPhotos", postsImageSchema);
