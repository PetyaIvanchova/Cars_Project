const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');
const {auth} = require('./middlewares/authMiddleware');

const app = express();
const port = 5006;

var cors = require('cors');
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/cars');

app.listen(port, () => console.log('Server is running...' + port));