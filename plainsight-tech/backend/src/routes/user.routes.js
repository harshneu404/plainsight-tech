const express = require('express');
const router = express.Router();

const users = require('../controller/user.controller');
const verifyBasicAuth = require('../middleware/autehnticate');

router.post('/',users.registerUser);
router.put('/',verifyBasicAuth,users.updateUser);
router.get('/',verifyBasicAuth,users.login);

module.exports = router;
