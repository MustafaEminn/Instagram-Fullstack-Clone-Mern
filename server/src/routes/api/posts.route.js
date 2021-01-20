"use strict";

const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts.controller");
const auth = require("../../middlewares/authorization");

router.post("/postsCreateImage", postsController.createPostImage);

module.exports = router;
