function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}

const checkInput= (value) => {
    return (Object.keys(value).length > 0)
}

module.exports.isEmail= isEmail
module.exports.checkInput= checkInput