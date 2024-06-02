const express = require('express');
const router = express.Router();

const {signup, login, getUserId, editProfile, fetchCurrentUserInfo} = require('../controllers/userController');

const { userMiddle } = require('../middleware/userMiddleware');


router.post('/signup', signup);
router.post('/login', login);


router.use(
    ['/getuserid', '/editprofile', '/fetchcurrentuserinfo'],
    userMiddle
  );

router.get("/getuserid",getUserId);
router.put("/editprofile",editProfile);
router.get("/fetchcurrentuserinfo",fetchCurrentUserInfo);




module.exports = router;


