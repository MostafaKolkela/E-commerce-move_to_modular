const joi = require('joi')
const AppError = require('../utils/AppError')

const userSchema = joi.object({
    firstName : joi.string().required(),
    lastName : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().alphanum().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    phone : joi.string().allow(''),
    city : joi.string().allow(''),
    street : joi.string().allow(''),
    flat : joi.string().allow(''),
    country : joi.string().allow(''),
    description : joi.string().allow(''),
    follower : joi.number().allow(''),
    role : joi.string().allow(''),
    date : joi.string().allow('')
})

const validateUser = ( req , res, next)=>{
    const {error , value} = userSchema.validate(req.body)
    if(error)
        {
            return next(new AppError(`${error.details[0].message}` , 400))
        }
    return next()
}

module.exports = validateUser