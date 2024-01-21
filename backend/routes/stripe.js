require('dotenv').config()
const express = require('express')
const router = express.Router()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


router.post('/create-checkout-session', async (req, res) => {

    const line_items = req.body.products.map(product => {
        return {
            price_data: { 
                currency: 'eur', 
                product_data: { 
                    name: product.title, 
                    description: product.brand, 
                    images: [product.img], 
                    metadata: { id: product.id } 
                }, 
                unit_amount: product.price*100
            },
            quantity: product.quantity
        }
    })

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { 
        allowed_countries: ['DE', 'NO', 'SE', 'LT', 'LV', 'EE', 'DE', 'FI']
    },
    shipping_options: [
        { 
            shipping_rate_data: { 
                type: 'fixed_amount', 
                fixed_amount: { 
                    amount: 0, 
                    currency: 'eur'
                }, 
                display_name: 'Free shipping', 
                delivery_estimate: { 
                    minimum: { 
                        unit: 'business_day', 
                        value: 5 
                    }, maximum: { 
                        unit: 'business_day', 
                        value: 7
                    } 
                } 
            } 
        }, 
        {  
            shipping_rate_data: { 
                type: 'fixed_amount', 
                fixed_amount: { 
                    amount: 800, 
                    currency: 'eur'
                }, 
                display_name: 'Next day air', 
                delivery_estimate: { 
                    minimum: { 
                        unit: 'business_day', 
                        value: 1
                    }, 
                    maximum: { 
                        unit: 'business_day', 
                        value: 1 
                    } 
                } 
            } 
        }
    ],
    phone_number_collection: { 
        enabled: true 
    },
    line_items,
    mode: 'payment',
    success_url: `${process.env.API_URL}/success`,
    cancel_url: `${process.env.API_URL}`,
  });

  res.send({ url: session.url });
});

module.exports = router