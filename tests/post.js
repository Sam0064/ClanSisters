const {Clan, Forum, Post, User} = require('../database');
const {expect} = require('chai');
const {db} = require('../database/connection');

let user = {username: 'fred_zirdung', password: 'fred_zirdung'};
let clan = {name: 'test_clan_please_ignore', userId: 0};
let forum = {name: 'test_forum_please_ignore', clanId: 0};
let post = {
  userId: 0, 
  forumId: 0,
  title: 'test_post_please_ignore', 
  body: 'test_body_please_ignore',
};

describe('Post Schema', function() {
  beforeEach(function(done) {
    db.sync({force: true})
      .then(() => {
        done();
      });
  });

  it('inserts new Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.id;
        return Post.create(post);
      })
      .then(function(newPost) {
        expect(newPost).to.exist;
        expect(newPost.title).to.equal(post.title);
        expect(newPost.body).to.equal(post.body);
        expect(newPost.userId).to.equal(post.userId);
        expect(newPost.forumId).to.equal(post.forumId);
        done();
      });
  });

  it('reads existing Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.id;
        return Post.create(post);
      })
      .then(newPost => {
        return Post.read({id: newPost.id});
      })
      .then(function(newPost) {
        expect(newPost).to.exist;
        expect(newPost.title).to.equal(post.title);
        expect(newPost.body).to.equal(post.body);
        expect(newPost.userId).to.equal(post.userId);
        expect(newPost.forumId).to.equal(post.forumId);
        done();
      });
  });

  it('updates existing Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.id;
        return Post.create(post);
      })
      .then(newPost => {
        post.id = newPost.id;
        return Post.update({id: newPost.id}, {title: 'TEST'} );
      })
      .then(newPost => {
        return Post.read({id: post.id});
      })
      .then(function(newPost) {
        expect(newPost).to.exist;
        expect(newPost.title).to.equal('TEST');
        expect(newPost.body).to.equal(post.body);
        expect(newPost.userId).to.equal(post.userId);
        expect(newPost.forumId).to.equal(post.forumId);
        done();
      });
  });

  it('deletes existing Posts', function(done) {
    User.create(user)
      .then(newUser => {
        clan.userId = newUser.id;
        post.userId = newUser.id;
        return Clan.model.create(clan);
      })
      .then(newClan => {
        forum.clanId = newClan.id;
        return Forum.create(forum);
      })
      .then(newForum => {
        post.forumId = newForum.id;
        return Post.create(post);
      })
      .then(newPost => {
        post.id = newPost.id;
        return Post.delete({id: newPost.id});
      })
      .then(newPost => {
        return Post.read({id: post.id});
      })
      .then(function(newPost) {
        expect(newPost).to.equal(null);
        done();
      });
  });
});
