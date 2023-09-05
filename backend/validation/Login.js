const isEmpty = require('./isEmpty');
const validator = require('validator');
const UserModel = require('../models/users.models');

module.exports = async function validateLogin(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  let user = await UserModel.findOne({ email: data.email }).then(
    async (user) => {
      console.log('user', user);
      if (user)
      if ('banned' in Object.keys(user))
      if (user.banned.isBanned) {
        console.log('normalement banned');
        return true;
      } else if (
        user.banned.isBanned &&
        new Date() > user.banned.banExpiresAt
      ) {
        console.log('normalement not banned');
        user.banned.isBanned = false;
        await UserModel.findOneAndUpdate({ _id: user._id }, user, {
          new: true,
        }).then((result) => {
          res.status(200).json(result);
        });
        return false;
      } else {
        console.log('normalement not banned');
        return false;
      }
      return false;
    }
  );
  console.log(user);

  if (!validator.isEmail(data.email)) {
    errors.email = 'Required format email';
  }
  if (validator.isEmpty(data.email)) {
    errors.email = 'Required email';
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Required password';
  }
  if (user == true) {
    errors.banned = 'You are banned till ...';
  }
  console.log(errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
