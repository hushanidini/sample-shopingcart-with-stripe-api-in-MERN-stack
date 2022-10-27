
require("dotenv").config();

const STRIPE_KEY_VALUE = process.env.STRIPE_PRIVATE_KEY;
const stripe = require("stripe")(STRIPE_KEY_VALUE);
const express = require('express');
const router = express.Router()
const STRIPEHANDLER = require('../controllers/stripeController');
const REGISTER = require('../controllers/userController');
const AUTH = require('../controllers/authController');
const PRODUCT_HANDLER = require('../controllers/productController');

const {isAdmin} = require('../middleware/auth');

// register api router
router.route('/api/register').post(REGISTER.createUser);
// login api router
router.route('/api/login').post(AUTH.loginUser);

// products api router
router.route('/api/products').get(PRODUCT_HANDLER.getProducts);
router.route('/api/products/create').post(isAdmin,PRODUCT_HANDLER.saveProduct);

// stripe webhook
// This is your Stripe CLI webhook secret for testing your endpoint locally.
let  endpointSecret; 
// endpointSecret = STRIPE_KEY_VALUE;

router.post('/api/stripe/webhook', express.raw({type: 'application/json'}), (req, res) => {
  
  const sig = req.headers['stripe-signature'];

  let eventType;
  let data;
  let event;
  if(endpointSecret){
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('webhook verified.')
        } catch (err) {
            console.log(`webhook error: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    }else{
        data = req.body.data.object;
        eventType = req.body.type;
    }
  // Handle the event
  if(eventType === "checkout.session.completed"){
    stripe.customers.retrieve(data.customer).
    then((customer) => {
        STRIPEHANDLER.saveOrder(customer, data)
        console.log('customer: ',customer);
        console.log('data: ', data)
    })
    .catch(err => console.log(err.message))
  }


  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
});

// stripe api router
router.route('/api/stripe/create-customer').post(STRIPEHANDLER.createNewCustomer);
router.route('/api/stripe/create-checkout-session').post(STRIPEHANDLER.createCheckoutSession);
// router.post('/create-customer', STRIPEHANDLER.createNewCustomer);
// router.post('/add-card', STRIPEHANDLER.addNewCard);
// router.post('/create-charges', STRIPEHANDLER.createCharges);

module.exports = router;