const Joi = require('joi');

const sripeNewCustomerParam = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().required()        
    }
}

module.exports = { sripeNewCustomerParam }