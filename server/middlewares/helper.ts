import { NextFunction } from "express";

exports.parseData = (req: any, res: Response, next: NextFunction) => {
  const { topicTags, testCases } = req.body;
  next();
};
