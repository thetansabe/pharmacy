const catchAsync = require('../../utils/catchAsync');
const Blog = require('../models/blogModel');
const checkRequiredFields = require('../../utils/checkRequiredFields');
const AppError = require('../../utils/appError');
const uploadImage = require('../../utils/uploadImage');

const getById = async (id) => {
	const blog = await Blog.findOne({
		where: {
			id,
		},
	});

	if (!blog) {
		throw new AppError(404);
	}

	return blog;
};

exports.getBlog = catchAsync(async (req, res, next) => {
	const blog = await getById(req.params.id);

	res.status(200).send('Render Blog');
});

exports.createBlog = catchAsync(async (req, res, next) => {
	req.body['image'] = req.files.image;
	checkRequiredFields(req.body, ['image', 'title', 'description', 'url']);

	const blogData = req.body;
	blogData.image = await uploadImage(req.files.image);

	const blog = await Blog.create(blogData);
	res.send('Redirect to Somewhere');
});

exports.renderCreateBlog = catchAsync(async (req, res, next) => {
	res.status(200).render('create-blog');
});

exports.renderUpdateBlog = catchAsync(async (req, res, next) => {
	res.send('update blog');
});

exports.getAllBlog = catchAsync(async (req, res, next) => {
	const blogs = await Blog.findAll();
	res.status(200).json(blogs);
});

exports.updateBlog = catchAsync(async (req, res, next) => {
	const blog = await getById(req.params.id);

	blog.update(req.body);

	await blog.save();

	res.json(blog);
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
	const blog = await getById(req.params.id);

	await blog.destroy();
	res.json('deleted');
});
