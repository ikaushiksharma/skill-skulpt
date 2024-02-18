const errorHandler = (err: any, req: any, res: any, next: any) => {
  res.status(500).json({ error: err.message || err });
};

module.exports = errorHandler;
