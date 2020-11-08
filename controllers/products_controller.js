const express = require('express')
const Product = require('../models/products.js')
const products = express.Router()
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// NEW

products.get('/new', (req, res)=>{
    res.render('products/new.html.ejs'),
    {currentUser: req.session.currentUser}
});

// EDIT

products.get('/:id/edit', (req, res)=>{
  Product.findById(req.params.id, (err, foundProduct)=>{
    res.render(
    	'products/edit.html.ejs',
    		{
    			product: foundProduct,
          currentUser: req.session.currentUser
    		}
    );
  });
});

// DELETE

products.delete('/:id', (req, res) =>{
  Product.findByIdAndRemove(req.params.id, (error, data)=>{
    res.redirect('/products');
  });
});

// SHOW

products.get('/:id', (req, res)=>{
  Product.findById(req.params.id, (error, foundProduct)=>{
    res.render('products/show.html.ejs', {
      product: foundProduct,
      currentUser: req.session.currentUser
    });
  });
});

// UPDATE
products.put('/:id', (req, res)=>{
  Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedModel)=>{
    res.redirect('/products');
  });
});

// CREATE
products.post('/', (req, res)=>{
  Product.create(req.body, (error, createdProduct)=>{
    res.redirect('/products');
  });
});

// INDEX
products.get('/', (req, res) =>{
  Product.find({}, (error, allProducts)=>{
      res.render('products/index.html.ejs', {
        products: allProducts,
        currentUser: req.session.currentUser
      });
  });
});

// PATCH

products.patch('/:id', (req, res)=>{
  Product.findByIdAndUpdate(req.params.id, {$inc: { qty: -1 }}, { new: true }, (error, updatedModel)=>{
    console.log(req.params.id);
    console.log(updatedModel);
    res.redirect('/products');
  });
});

// SEED
products.get('/setup/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'Bia Boxing Gloves',
        description: 'Lightweight, premium leather and a foam construction to celebrate the fight within you.',
        img: 'https://i.ibb.co/N94K8D9/boxing-gloves.jpg',
        price: 85,
        qty: 10
      },
      {
        name: 'Everlast Heavy Bag Stand',
        description: 'Dual heavybag and speed bag stand for your quarantine needs.',
        img: 'https://i.ibb.co/54XRNGB/everlaststand.jpg',
        price: 200,
        qty: 2
      },
      {
        name: 'No Prince Charming Cropped Sweatshirt',
        description: 'Comfortable, cropped body length for the gym or streetwear.',
        img: 'https://i.ibb.co/GdN0SVd/cropped-sweatshirt.jpg',
        price: 57,
        qty: 5
      },
      {
        name: 'Fairtex Muay Thai Shorts',
        description: 'Kick butt in these leopard shorts from the best brand in Muay Thai gear and apparel.',
        img: 'https://i.ibb.co/cxZ0Yg0/boxing-shorts.jpg',
        price: 35,
        qty: 3
        }
    ],
    (error, data) => {
      res.redirect('/products')
  })
})

// DROP DB ROUTE

module.exports = products
