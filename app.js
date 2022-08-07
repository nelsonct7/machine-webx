const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();
let readData=require('readline-sync')


const connectDB=require('./connections/connection')

require('dotenv').config()
let URL=""
let choice=readData.question("Select the Data base to be connected\n1 : INT\n2 : PRO \n3 : DEV\n");
switch (choice) {
    case "1":
        URL=process.env.DB_URL_INT
        break;
    case "2":
        URL=process.env.DB_URL_PRO
        break;
    case "3":
        URL=process.env.DB_URL_DEV
        break;
    default:
        break;
}
connectDB(URL)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
