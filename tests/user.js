const User = require('../database').User;
const expect = require('chai').expect;

describe('User schema', function() {
  beforeEach(function(done) {
    User.truncate()
      .then(done);
  });

  it('inserts new users', function(done) {
    var user = {username: 'John Doe', password: 'John Doe'};

    User.create(user)
      .then(function(newUser) {
        expect(newUser.username).to.exist;

        done();
      });
  });

  xit('does not allow duplicate users', function(done) {
  });
});