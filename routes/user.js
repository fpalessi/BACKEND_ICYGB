const {
  register,
  authenticate,
  confirm,
  checkToken,
  profile,
  getNewPass,
  getNewUsername,
  deleteUser,
  getAllUsers,
  getUserStats,
  passwordResetter,
} = require("../controllers/userController");
const router = require("express").Router();

// REGISTER
router.post("/register", register);
// LOGIN
router.post("/login", authenticate);
// CONFIRM ACCOUNT
router.get("/confirm/:token", confirm);
// PASSWORD-RESET
router.post("/password-reset", passwordResetter);
// router.route("/password-reset/:token").get(checkToken).post(getNewPass);
router.get("/password-reset/:token", checkToken);
router.post("/password-reset/:token", getNewPass);

module.exports = router;
