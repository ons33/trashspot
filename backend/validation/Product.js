const isEmpty = require('./isEmpty');
const validator = require('validator')

module.exports = async function validatorProduct(data){
    let errors ={};
    data.category = !isEmpty(data.category) ? data.category : ""
    data.type = !isEmpty(data.type) ? data.type : ""
    data.brand = !isEmpty(data.brand) ? data.brand : ""
    data.price = !isEmpty(data.price) ? data.price : ""
    data.quantity = !isEmpty(data.quantity) ? data.quantity : ""
    data.expiry_date = !isEmpty(data.expiry_date) ? data.expiry_date : ""


    if (validator.isEmpty(data.category)){
        errors.category = "Required category";
    }
    if (validator.isEmpty(data.type)){
        errors.type = "Required type";
    }   
    if (validator.isEmpty(data.brand)){
        errors.brand = "Required brand";
    }
    if (validator.isEmpty(data.price)){
        errors.price = "Required price";
    }
    if (validator.isEmpty(data.quantity)){
        errors.quantity = "Required quantity";
    }
    if (validator.isEmpty(data.expiry_date)){
        errors.expiry_date = "Required expiry_date";
    }

    return{
        errors,
        isValid : isEmpty(errors)
    }
}