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
    likes: [],
    follows: [],
    bookmarks: [],
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

  async toggleLike(username, id) {
    const likeCheck = await this.findOne({ username }).exec();
    const likeBool = likeCheck.likes.includes(id);
    if (!likeBool) {
      const like = await this.findOneAndUpdate(
        { username },
        { $push: { likes: id } }
      ).exec();
      if (!like) {
        return false;
      } else {
        return like;
      }
    } else {
      const newList = likeCheck.likes.filter((item) => {
        return item !== id;
      });
      const like = await this.findOneAndUpdate(
        { username },
        { $set: { likes: newList } }
      ).exec();
      if (!like) {
        return false;
      } else {
        return like;
      }
    }
  },

  async checkLike(username, id) {
    const likeCheck = await this.findOne({
      username,
    }).exec();
    const likeBool = likeCheck.likes.includes(id);

    if (!likeBool) {
      return false;
    } else {
      return likeCheck;
    }
  },

  async toggleBookmark(username, id) {
    const bookmarkCheck = await this.findOne({ username }).exec();
    const bookmarkBool = bookmarkCheck.bookmarks.includes(id);
    if (!bookmarkBool) {
      const bookmark = await this.findOneAndUpdate(
        { username },
        { $push: { bookmarks: id } }
      ).exec();
      if (!bookmark) {
        return false;
      } else {
        return bookmark;
      }
    } else {
      const newList = bookmarkCheck.bookmarks.filter((item) => {
        return item !== id;
      });
      const bookmark = await this.findOneAndUpdate(
        { username },
        { $set: { bookmarks: newList } }
      ).exec();
      if (!bookmark) {
        return false;
      } else {
        return bookmark;
      }
    }
  },

  async checkBookmark(username, id) {
    const bookmarkCheck = await this.findOne({
      username,
    }).exec();
    const bookmarkBool = bookmarkCheck.bookmarks.includes(id);
    if (!bookmarkBool) {
      return false;
    } else {
      return bookmarkCheck;
    }
  },

  async toggleFollow(username, usernamePost) {
    const followCheck = await this.findOne({ username }).exec();
    const followBool = followCheck.follows.includes(usernamePost);
    if (!followBool) {
      const follow = await this.findOneAndUpdate(
        { username },
        { $push: { follows: usernamePost } }
      ).exec();
      if (!follow) {
        return false;
      } else {
        return follow;
      }
    } else {
      const newList = bookmarkCheck.bookmarks.filter((item) => {
        return item !== usernamePost;
      });
      const follow = await this.findOneAndUpdate(
        { username },
        { $set: { follows: newList } }
      ).exec();
      if (!follow) {
        return false;
      } else {
        return follow;
      }
    }
  },

  async checkFollow(username, usernamePost) {
    const followCheck = await this.findOne({
      username,
    }).exec();
    const followBool = followCheck.follows.includes(usernamePost);
    if (!followBool) {
      return false;
    } else {
      return followCheck;
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

  async findUsernameOnId(uniq) {
    const user = await this.findOne({ email: uniq }).exec();
    if (!user) {
      return false;
    } else {
      return user;
    }
  },
};

module.exports = mongoose.model("Users", userSchema);
