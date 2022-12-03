const router = require('express').Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidation } = require('../middlewares/joiValidation');

router.get('/me', getUserInfo);

router.patch('/me', updateUserInfoValidation(), updateUserInfo);

module.exports = router;
