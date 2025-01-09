const { register } = require("../controllers/UserController");

const router=require("express").Router();

router.post("/register",register);

module.exports=router;