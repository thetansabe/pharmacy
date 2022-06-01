const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const blogRouter = require('./routes/blogRoute');
const viewRouter = require('./routes/viewRoute');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();

app.set('views', `${__dirname}/views/`);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static(`${__dirname}/public/`));

app.use('/users', userRouter);
app.use('/blogs', blogRouter);
app.use('/', viewRouter, authRouter);
app.all('*', (req, res, next) => {
	next(new AppError(404));
});

app.use(globalErrorHandler);
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
// 	next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
// 	const blog = 'fewfwfw';
// 	// set locals, only providing error in development
// 	res.locals.message = err.message;
// 	res.locals.error = req.app.get('env') === 'development' ? err : {};

// 	// render the error page
// 	res.status(err.status || 500);
// 	res.render('error');
// });

module.exports = app;
