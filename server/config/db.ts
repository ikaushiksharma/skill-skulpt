const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URI}`);
const dB = mongoose.connection;

dB.on('error', console.error.bind(console, 'error connecting to db'));

dB.once('open', function () {
  console.log('Successfully connected to database');
});
