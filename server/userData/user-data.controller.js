var Q = require('q');
var User = require('./user-data.model.js');

var createUser = Q.nbind(User.create, User);

module.exports = {
  signin: function (req, res, next) {
    var username = req.body.user;
    var password = req.body.password;

    findUser({user: user, password: password})
    .than(function (user) {//Eric: is it supposed to be thAn or thEn?
      if(!user) {
        next(new Error("User does not exist"));
      } else {
        res.send('success');
      }
    })
    .fail(function (error) {
      next(error);
    })
  },


  newUser: function (req, res, next) {
    console.log("Received User Data from client: ", req.body);
    return createUser({
      userRealName: req.body.userRealName,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    })
    .fail(function (error) {
      next(error);
    })
  }
}
