import express from "express";
const router = express.Router();

const {
  postLoginUser,
  postAuthenticateUser,
  postLogoutUser,
} = require("../controllers/authControler");

router.post("/register", postLoginUser);
router.post("/login", postAuthenticateUser);
router.post("/logout", postLogoutUser);

export { router as auth };
