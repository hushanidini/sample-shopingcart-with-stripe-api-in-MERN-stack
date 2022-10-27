const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const getAuthToken = require('../utils/genAuthToken');

loginUser = async(req, res) => {
    try{
        const schema = Joi.object({
            email: Joi.string().min(3).max(200).required().email(),
            password: Joi.string().min(3).max(200).required()
        });

        const {error} = schema.validate(req.body);
        if (error) return res.status(400).send({success: false, error : error.details[0].message});

      
        let isExistUser = await User.findOne({email: req.body.email});
        if (!isExistUser) return res.status(400).send({ success: false, error: "Invalid email or password.." });

        const isValid = await bcrypt.compare(req.body.password,isExistUser.password);

        if(!isValid) return res.status(400).send({ success: false, error: "Invalid email or password.." })
        const token = getAuthToken(isExistUser);

        res.send({success: true,accessToken: token});
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
};

module.exports = {loginUser}