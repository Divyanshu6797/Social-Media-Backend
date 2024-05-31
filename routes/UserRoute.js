const express = require('express');
const router = express.Router();

const {signup, login, getUserId} = require('../controllers/userController');

const { userMiddle } = require('../middleware/userMiddleware');


router.post('/signup', signup);
router.post('/login', login);


router.use(
    ['/getuserid'],
    userMiddle
  );

router.get("/getuserid",getUserId);




module.exports = router;


