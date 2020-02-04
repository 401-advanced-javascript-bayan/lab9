'use strict';

const mongoose = require('mongoose');
require('../categories-mod/categories-schema.js');

const products = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: 'number', required: true },
  weight: { type: 'number' },
  quantity_in_stock: { type: 'number', required: true },
  category: { type: String, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });


products.virtual('realCat', {
  
  ref: 'categories',
  
  localField: 'name',
  foreignField: 'category',
  justOne: false,
}); 


products.pre('findOne', function () {
  try {
    
    this.populate('realCat');
  }
  catch (err) {
    console.error(err);
  }
}); 


module.exports = mongoose.model('products', products);