const router = require("express").Router();

const { getUsers, getUser, createUser, updateProfile, updateAvatar } = require("../controllers/users");

router.get("/me", getUser);

router.post("/", createUser);

router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
