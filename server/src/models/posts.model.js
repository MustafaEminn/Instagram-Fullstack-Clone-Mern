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

  async addComment(id, username, message) {
    let posts = await this.findOne({ _id: id }).exec();
    let commentsNumber = posts.commentsNumber;
    let postsUpdate = await this.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: { username: username, message: message } },
        $set: { commentsNumber: commentsNumber + 1 },
      },
      { new: true }
    ).exec();
    if (!posts) {
      return false;
    } else {
      return postsUpdate;
    }
  },

  async deletePost(id) {
    let deletedPost = await this.findOneAndDelete({ _id: id }).exec();
    if (!deletedPost) {
      return false;
    } else {
      return true;
    }
  },

  async checkPostAdmin(username, id) {
    let user = await this.findOne({ username: username }).exec();
    if (user._id === id) {
      return true;
    } else {
      return false;
    }
  },
  async getUserPost(username) {
    let user = await this.find({ username: username }).exec();
    return user;
  },

  async getPostOnId(id) {
    let post = await this.findOne({ _id: id }).exec();
    return post;
  },
};

module.exports = mongoose.model("Posts", postsSchema);
