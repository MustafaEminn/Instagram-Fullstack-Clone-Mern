"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    likes: [],
    likesNumber: {
      type: Number,
      default: 0,
    },
    commentsNumber: {
      type: Number,
      default: 0,
    },
    comments: [],
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

  async addLike(id, username) {
    const posts = await this.findOne({ _id: id }).exec();

    const likeCount = posts.likesNumber;
    const likeBool = posts.likes.includes(username);
    if (!likeBool) {
      const postsUpdate = await this.findOneAndUpdate(
        { _id: id },
        { $set: { likesNumber: likeCount + 1 }, $push: { likes: username } },
        { new: true }
      ).exec();
      if (!posts) {
        return false;
      } else {
        return postsUpdate;
      }
    } else {
      const newList = posts.likes.filter((item) => {
        return item !== username;
      });
      const postsUpdate = await this.findOneAndUpdate(
        { _id: id },
        { $set: { likesNumber: likeCount - 1, likes: newList } },
        { new: true }
      ).exec();
      if (!posts) {
        return false;
      } else {
        return postsUpdate;
      }
    }
  },
};

module.exports = mongoose.model("Posts", postsSchema);
