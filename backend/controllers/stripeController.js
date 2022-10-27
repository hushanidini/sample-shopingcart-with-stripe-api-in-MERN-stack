const { Order } = require("../models/order");

const STRIPE_KEY_VALUE = process.env.STRIPE_PRIVATE_KEY;
const stripe = require("stripe")(STRIPE_KEY_VALUE);
const YOUR_DOMAIN = process.env.CLIENT_DOMAIN; // client domain

// create customer
module.exports.createNewCustomer = async(req, res, next) => {
    try{
        res.header("Access-Control-Allow-Origin", "*")
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
        })
        res.status(200).send(customer);
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

module.exports.createCheckoutSession = async(req, res,next) => {
    try{
        res.header("Access-Control-Allow-Origin", "*")

        // create customer info
        const customer = await stripe.customers.create({
            metadata:{
                userId: req.body.userId,
                cart: JSON.stringify(req.body.cartItems)
            }
        })
        const line_items = req.body.cartItems.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        description: item.desc,
                        metadata: {
                            id: item.id
                        },
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.cartQuantity,
                
            }
        });

        const session = await stripe.checkout.sessions.create({
            customer: customer?.id,
            line_items,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/checkout-success`,
            cancel_url: `${YOUR_DOMAIN}/cart`,
          });
        
        //    res.redirect(303, session.url);
         res.send(session.url);
      
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

// stripe order save on mongoose DB
module.exports.saveOrder = async(customer, data) => {
    
        const Items = JSON.parse(customer?.metadata?.cart);
        
        const newOrder = new Order({
            userId: customer?.metadata?.userId,
            customerId: data?.customer,
            paymentIntentId: data?.payment_intent,
            products: Items,
            subtotal: data?.amount_subtotal,
            total: data?.amount_total,
            shipping: data?.customer_details,
            payment_status: data?.payment_status
        })
        try{
            const savedOrder = await newOrder.save();
           
            console.log("Processed Order: ", savedOrder);
        }catch(error){
            console.log('save order error : ',error)
            throw new Error(error)
        }
}