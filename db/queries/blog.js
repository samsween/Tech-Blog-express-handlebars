const { Blog, Comment, User, Like } = require("../../models/index");

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      attributes: ["id", "title", "body", "date"],
    });
    return blogs.map((blog) => blog.get({ plain: true }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getSingleBlog = async (id) => {
  try {
    const blog = await Blog.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username", "id"],
            },
            {
              model: Like,
              attributes: ["id", "user_id"],
            },
          ],
        },
      ],
      attributes: ["id", "title", "body", "date"],
    });
    const singleBlogs = blog.get({ plain: true }).for;
    return blog.get({ plain: true });
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getBlogsByUser = async (id) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: Like,
            },
          ],
        },
      ],
      attributes: ["id", "title", "body", "date"],
    });
    return blogs.map((blog) => blog.get({ plain: true }));
  } catch (err) {
    console.log(err);
    return [];
  }
};

module.exports = {
  getAllBlogs,
  getSingleBlog,
  getBlogsByUser,
};
