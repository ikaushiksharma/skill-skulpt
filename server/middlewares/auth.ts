import { NextFunction } from "express";

const User = require("../models/users/user");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");

exports.isAuth = async (req: any, res: any, next: NextFunction) => {
  const token = req.headers?.authorization;
  if (!token) return sendError(res, "Invalid Token!");

  const jwtToken = token.split("Bearer ")[1];
  if (!jwtToken) return sendError(res, "invalid Token");
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
  const { userId } = decode;
  const user = await User.findById(userId);
  if (!user) sendError(res, "Invalid Token: User Not Found", 404);
  req.user = user;
  next();
};

exports.isAdmin = (req: any, res: any, next: NextFunction) => {
  const { user } = req;
  if (user.role !== "admin") return sendError(res, "Unauthorized Access");
  next();
};
