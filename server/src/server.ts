const express = require('express');
const errorHandler = require('../middlewares/error');
const app = express();
require('dotenv').config();
const db = require('../config/db');
const cors = require('cors');
const morgan = require('morgan');
const { handleNotFound } = require('../utils/helper');
const userRouter = require('../routes/user');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: any, res: any) => {
  res.send(`Server is Up and Working!!`);
});
app.use('/api/user', userRouter);
app.use('/*', handleNotFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, (err: Error) => {
  if (err) {
    console.error('Error in running the server ', port);
  } else {
    console.log('🚀🚀 Server running at port ', port);
  }
});


