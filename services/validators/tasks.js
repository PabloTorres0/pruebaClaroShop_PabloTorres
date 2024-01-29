const {check} = require ("express-validator")
const validateResults = require('../utils/handleValidators')
const validatorCreateItem = 
[
    check("task")
    .exists()
    .notEmpty(),

    check("state")
    .exists()
    .notEmpty()
    .isBoolean(),

    check("priority")
    .exists()
    .notEmpty(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }
] 

const validatorGetItem = 
[
    
    check("id")
    .exists()
    .notEmpty()
    .isMongoId(),
    (req, res, next) => {
       return validateResults(req, res, next)
    }
] 




module.exports = {validatorCreateItem, validatorGetItem}