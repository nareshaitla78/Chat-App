const { register, login, resetPassword } = require("../controllers/UserController");
const User = require('../model/UserModel');
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/forgot-password", resetPassword);
router.post("/register", register);
router.post("/login", login);

router.post("/reset-password", async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const user = await User.findOne({ resetToken });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();  
    res.json({ message: "Password reset successful." ,status:true});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing request.",status:false });
  }
});

module.exports = router;
