const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const blogRouter = require('./routes/blogRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const viewRouter = require('./routes/viewRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

app.set('views', `${__dirname}/src/views/`);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public/`));

app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/products', productRouter);
app.use('/shopping-cart', cartRouter);
app.use('/', viewRouter, authRouter);
app.all('*', (req, res, next) => {
	next(new AppError(404));
});

app.use(globalErrorHandler);

module.exports = app;
