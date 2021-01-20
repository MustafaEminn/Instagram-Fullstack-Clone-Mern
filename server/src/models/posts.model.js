"use strict";
const mongoose = require("mongoose");
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
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postsSchema.statics = {
  async getAll() {
    const posts = await this.find({}).exec();
    if (!posts) {
      return false;
    } else {
      return posts;
    }
  },
};

module.exports = mongoose.model("Posts", postsSchema);
