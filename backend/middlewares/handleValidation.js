const { validationResult } = require('express-validator');

const validate = (req, res, next) =>{
    const error = validationResult(req);

    if(error.isEmpty()){
        return next();
    }

    const extractErrors = [];

    error.array().map( err => extractErrors.push(err.msg));
    return res.status(422).json({
        errors: extractErrors,
    })
}

module.exports = validate