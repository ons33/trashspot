const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateProfile(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";

  if (validator.isEmpty(data.firstName)) {
    errors.tel = "Required first name";
  }
 
  if (validator.isEmpty(data.lastName)) {
    errors.city = "Required last name";
  }
  if (validator.isEmpty(data.phoneNumber)) {
    errors.country = "Required phone number";
  }
  
  


  return {
      errors,
      isValid: isEmpty(errors)
  }
};