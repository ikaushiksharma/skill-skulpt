// @ts-nocheck
const crypto = require("crypto");

exports.sendError = (res: any, error: any, statusCode = 401) => {
  res.status(statusCode).json({ error });
};
exports.handleNotFound = (req: any, res: any) => {
  // @ts-ignore
  this.sendError(res, "Not found", 404);
};

exports.generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err: any, buff: any) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");

      console.log(buffString);
      resolve(buffString);
    });
  });
};

exports.ValidationError = (location, param, value, msg) => {
  var error = {};

  error.location = location;
  error.param = param;
  error.value = value;
  error.msg = msg;

  return error;
};
exports.buildError = function (message) {
  var error = new ValidationError("location", "param", "value", message);
  return error;
};

