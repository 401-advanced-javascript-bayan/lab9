'use strict';

const Model = require('../model.js');
const schema = require('../categories/categories-schema.js');

class Categories extends Model {
  constructor() {
    super(schema);
  }
}


module.exports =  Categories;