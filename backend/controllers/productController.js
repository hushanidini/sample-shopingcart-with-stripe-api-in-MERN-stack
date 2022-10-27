const { Product } = require("../models/product");
const cloudinary = require("../utils/cloudinary");

module.exports.saveProduct = async(req, res) => {
    const  {name, desc, price, image} = req.body;
    try{
        if(image){
            const uploadRes = await cloudinary.uploader.upload(image,{
                upload_preset: "onlineShop",
            });

            if(uploadRes) {
                const newProduct = new Product({
                    name,
                    desc,
                    price,
                    image: uploadRes,
                });
        
                const savedProduct = await newProduct.save();
        
                console.log("Saved product: ", savedProduct);
                if(savedProduct){
                    res.status(200).send({success: true, data:savedProduct})
                    // res.status(200).send({success: true, data: savedProduct})
                }else{
                    res.send(500).send({success: false, error : 'error happened'})
                }
                
            }
        }
      
    }catch(error){
        console.log('save product error : ',error)
        res.send(500).send({success: false, error : error})
        throw new Error(error)
    }
}


module.exports.getProducts = async(req, res) => {
    try{
        const products = await Product.find();
        res.status(200).send({success: true, data: products})
    }catch(error){
        console.log('get all products error : ',error)
        res.send(500).send({success: false, error : error})
        throw new Error(error)
    }
}