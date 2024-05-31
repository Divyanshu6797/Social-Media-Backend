const express = require('express');
const router = express.Router();

const {signup, login} = require('../controllers/userController');

const { userMiddle } = require('../middleware/userMiddleware');


router.post('/signup', signup);
router.post('/login', login);

// router.use(
//     [],
//     userMiddle
//   );




module.exports = router;


