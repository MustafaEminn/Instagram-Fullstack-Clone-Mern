"use strict";

const Joi = require("joi");

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      username: Joi.string().min(6).max(128).required(),
      fullname: Joi.string().min(6).max(128).required(),
    },
  },
};
