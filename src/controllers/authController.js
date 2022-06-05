const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const checkRequiredFields = require("../../utils/checkRequiredFields");
const AppError = require("../../utils/appError");

const generateToken = async (id) => {
    return await promisify(jwt.sign)({ id }, "Pharmacy Website", {
        expiresIn: "1d",
    });
};

const verifyToken = async (token) => {
    return await promisify(jwt.verify)(token, "Pharmacy Website");
};

const sendToken = async (user, statusCode, res) => {
    const token = await generateToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);
    res.cookie("user_id", user.id);
    res.redirect("/");
};

exports.protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return next(new AppError(401));
    }

    const payload = await verifyToken(token);
    const user = await User.findOne({
        where: {
            id: payload.id,
        },
    });

    if (!user) {
        return next(new AppError(401));
    }

    req.user = user;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(403));
        }
        next();
    };
};

exports.signup = catchAsync(async (req, res, next) => {
    checkRequiredFields(
        req.body,
        [
            "name",
            "gender",
            "tel",
            "birthday",
            "address",
            "username",
            "password",
        ],
        "register"
    );

    await User.create(req.body);
    res.redirect("http://localhost:3000/login");
});

exports.login = catchAsync(async (req, res, next) => {
    checkRequiredFields(req.body, ["username", "password"], "login");

    const user = await User.findOne({
        attributes: ["id", "password"],
        where: {
            username: req.body.username,
        },
    });

    if (!user || !(await user.isCorrectPassword(req.body.password))) {
        throw new AppError(400, {
            ["login-message"]: "Incorrect username or password",
        });
    }

    await sendToken(user, 200, res);
});

exports.logout = (req, res, next) => {
    res.clearCookie("jwt");
    res.clearCookie("user_id")
    res.status(200).json({code: 0});
};

exports.changePassword = catchAsync(async (req, res, next) => {
    checkRequiredFields(
        req.body,
        ["currentPassword", "newPassword", "passwordConfirm"],
        "change-password"
    );

    const { currentPassword, newPassword, passwordConfirm } = req.body;

    if (!(await req.user.isCorrectPassword(currentPassword)))
        throw new AppError(400, {
            ["currentPassword-message"]: "Current password is incorrect",
        });

    if (newPassword !== passwordConfirm)
        throw new AppError(400, {
            ["passwordConfirm-message"]:
                "Password confirm must be same as new password",
        });

    await req.user.update({ password: newPassword });
    await req.user.save();

    res.redirect("/");
});
