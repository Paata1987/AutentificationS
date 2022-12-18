require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errormiddleware = require('./middleware/error-middleware');

mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api', router);
app.use(errormiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server is starting on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
