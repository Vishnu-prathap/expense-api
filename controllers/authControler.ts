import { Auth } from "../model/authModel";
import { Response, Request } from "express";
import { clearToken, generateToken } from "../utils/authUtils";

exports.postLoginUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const userExists = await Auth.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "The user already exists" });
  const user = await Auth.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user.uid);
    return res.status(201).json({
      id: user.uid,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({
      message: "An error occurred in creating the user",
    });
  }
};

exports.postAuthenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      return res.status(201).json({
        id: user.uid,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "User not found / password is incorrect",
    });
  }
};

exports.postLogoutUser = async (req: Request, res: Response) => {
  clearToken(res);
  res.status(200).json({
    message: "User logged out",
  });
};
