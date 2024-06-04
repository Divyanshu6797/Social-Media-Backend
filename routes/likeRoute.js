const express = require("express");
const router = express.Router();

const {
  likeAPost,
  unLikeAPost,
  fetchLikesOnAPost,
  findIfAPostIsLiked,
} = require("../controllers/likeController");
const { likeMiddle } = require("../middleware/likeMiddleware");

router.use([], likeMiddle);

router.post("/likeapost", likeAPost);
router.delete("/unlikeapost", unLikeAPost);
router.get("/fetchlikesonapost", fetchLikesOnAPost);
router.get("/findifapostisliked", findIfAPostIsLiked);

module.exports = router;
