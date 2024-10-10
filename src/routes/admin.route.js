const express = require("express");
const user_controller = require("../controllers/user.controller");
const router = express.Router();
const { authUser,authorizeAdmin } = require("../middleware/auth");


router.post("/signup", user_controller.signup)
router.put("/adminupdate/:userId", authUser, authorizeAdmin, user_controller.adminupdate);
router.delete("/adminsdelete/:userId", authUser, authorizeAdmin, user_controller.admindelete);

module.exports = router;
