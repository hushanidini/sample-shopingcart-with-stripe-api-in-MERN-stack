const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const getAuthToken = require('../utils/genAuthToken');

createUser = async(req, res) => {
    try{

        const schema = Joi.object({
            name: Joi.string().min(3).max(35).required(),
            email: Joi.string().min(3).max(200).required().email(),
            password: Joi.string().min(3).max(200).required()
        });

        const {error} = schema.validate(req.body);

        if (error) return res.status(400).send({success: false, error : error.details[0].message});

      
        let isExistUser = await User.findOne({email: req.body.email});
        if (isExistUser) return res.status(400).send({ success: false, error: "User already exist.." });


        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password: req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)

        const newSaveduser = await user.save();
        const token = getAuthToken(newSaveduser);

        res.send({success: true,accessToken: token});
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}


module.exports = { createUser }