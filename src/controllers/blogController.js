const catchAsync = require('../../utils/catchAsync');
const Blog = require('../models/blogModel');

const moveImage = async (image) => {
	const uploadPath = `./public/uploads/${image.name}`;
	await image.mv(uploadPath);

	return image.name;
};

exports.getBlog = catchAsync(async (req, res, next) => {
	const blog = await Blog.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!blog) {
		res.send('not blog');
	}

	res.send(blog);
});

exports.createBlog = catchAsync(async (req, res, next) => {
	const blogData = req.body;
	blogData['image'] = await moveImage(req.files.image);
	res.send(blogData);

	const blog = await Blog.create(blogData);
	res.send('Redirect to Somewhere');
});

exports.renderCreateBlog = catchAsync(async (req, res, next) => {
	res.send('create blog');
});

exports.renderUpdateBlog = catchAsync(async (req, res, next) => {
	res.send('update blog');
});

exports.getAllBlog = catchAsync(async (req, res, next) => {
	const blogs = await Blog.findAll();
	res.send(blogs);
});

exports.updateBlog = catchAsync(async (req, res, next) => {
	const blog = await Blog.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!blog) {
		res.send('not blog');
	}

	blog.update(req.body);

	await blog.save();

	res.json(blog);
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
	const blog = await Blog.findOne({
		where: {
			id: req.params.id,
		},
	});

	if (!blog) {
		res.send('not blog');
	}

	await blog.destroy();
	res.json('deleted');
});
