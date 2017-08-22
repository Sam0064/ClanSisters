const Forum = require('./forum');
const User = require('./user');
const {Sequelize, db} = require('../connection');

const PostModel = db.define('post', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  pinned: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

const Post = {model: PostModel};

Post.findAll = (query = {}) => {
  return PostModel.findAll({where: {}});
};

/**
 * Post crud methods.
 */
Post.create = ({title, body, pinned, userId, forumId}) => {
  if (!title) {
    throw new Error('Title must exist!', title);
  }
  if (!body) {
    throw new Error('body must exist!', body);
  }
  return PostModel.create({title, body, pinned, userId, forumId});
};

Post.read = Post.find = (query) => {
  return PostModel.findOne({where: query});
};

Post.update = (query, values) => {
  return Post.find(query)
    .then(post => {
      if (!post) {
        throw new Error('Post does not exist!');
      }
      return PostModel.update(values, {where: query});
    });
};

Post.delete = Post.destroy = (query) => {
  return PostModel.destroy({where: query});
};

module.exports = Post;