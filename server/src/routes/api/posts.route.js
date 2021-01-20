"use strict";

const express = require("express");
const router = express.Router();
const postsController = require("../../controllers/posts.controller");
const auth = require("../../middlewares/authorization");

router.post("/postsCreate", auth(), postsController.createPost);
router.get("/getAll", auth(), postsController.getAllPost);

module.exports = router;
