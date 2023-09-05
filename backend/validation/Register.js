const isEmpty = require('./isEmpty');
const validator = require('validator')
const axios = require('axios');


module.exports = async function validatorRegister(data){
    let errors ={};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirm = !isEmpty(data.confirm) ? data.confirm : ""

    
    if (validator.isEmpty(data.firstName)){
        errors.firstName = "Required firstName";
    }
    if (validator.isEmpty(data.lastName)){
        errors.lastName = "Required lastName";
    }   
    if (!validator.isEmail(data.email)){
        errors.email = "Required format email";
    }
    if (validator.isEmpty(data.email)){
        errors.email = "Required email";
    }else{
        let holder;
        holder = await checkEmail(data.email)
        if (holder)
        errors.email =holder;
    }
    if (validator.isEmpty(data.password)){
        errors.password = "Required password";
    }
    // if (!validator.isStrongPassword(data.password)){
    //     errors.password = "password must contain uppercase, lowercase, numbers, symbols";
    // }
    if(!validator.equals(data.password, data.confirm)){
        errors.confirm = "passwords doesn't match";
    }
    if (validator.isEmpty(data.confirm)){
        errors.confirm = "Required confirm";
    }
    return{
        errors,
        isValid : isEmpty(errors)
    }
}

async function checkEmail(email){
    var tegt ;
    // await axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=1655116fb4ab42d49aa7b696826e3af3&email='+email)
    //         .then(response => {
    //             if (response.data["deliverability"]!="DELIVERABLE"){
    //                 tegt= "Email does not exist (Undelivrable)"
    //             }
    //             // return ""
    //         })
    //         .catch(error => {
    //             // return "errorr email"
    // });
    return tegt;
}