'use strict';

const {server} = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server) ;

console.log(mockRequest);
describe('Categories API', () => {

  it('Get the work' , ()=> {
    return mockRequest.get('/api/v1/categories')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('Get the work with id' , ()=> {
    let newVal = { name: 'lena' , kids : 3 , favourites : [ 'food', 'read', 'cook', 'pets']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        console.log(data.body._id);
        return mockRequest.get(`/api/v1/categories/${data.body._id}`)
        
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name).toEqual('lena');
            console.log('val',data.body);
          });
        
      });

  });


  it('Post the work' , ()=> {
    let newVal = { name: 'lena' , kids : 3 , favourites : [ 'food', 'read', 'cook', 'pets']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        Object.keys(newVal).forEach(value => {
          expect(data.body[value]).toEqual(newVal[value]);
        });
      });
  });


  it('Updating the work' , ()=> {
    let newVal = { name: 'lena' , kids : 3 , favourites : [ 'food', 'read', 'cook', 'pets']};
    let updated = { name: 'sally' , kids : 0 , favourites : [ 'teaching']};

    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {

        return mockRequest.put(`/api/v1/categories/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name).toBe('sally');
          });
      });
  });



  it('Deleting the work' , ()=> {
    let newVal =  { name: 'lena' , kids : 3 , favourites : [ 'food', 'read', 'cook', 'pets']};
    return mockRequest.post('/api/v1/categories')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/categories/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(200);
                expect(data.body[0]).toBe(undefined);

              });
          });
      });


  });


}) ;

///////////////// products Test ////////////

describe('Products API', () => {

  it('Get the work' , ()=> {
    return mockRequest.get('/api/v1/products')
      .then(data => {
        expect(data.status).toBe(200);
      });
  });
  
  it('Get the work with id' , ()=> {
    let newVal = { name: 'shero' , price : 44 , weight : 85 , quantity_in_stock : 3};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        console.log(data.body._id);
        return mockRequest.get(`/api/v1/products/${data.body._id}`)
          .then(data => {
            expect(data.status).toBe(200);
            expect(data.body[0].name).toEqual('shero');
          });
          
      });
  
  });
  
  
  it('Post the work with id' , ()=> {
    let newVal = { name: 'shero' , price :44 , weight : 85 , quantity_in_stock :3};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        Object.keys(newVal).forEach(value => {
          expect(data.body[value]).toEqual(newVal[value]);
          console.log( 'value ',newVal[value]);
        });
      });
  });
  
  
  it('Update the work' , ()=> {
    let newVal = { name: 'shero' , price : 44 , weight : 85 , quantity_in_stock : 3};
    let updated = { name: 'gatera' , price : 0 , weight : 0 , quantity_in_stock : 6};
  
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
  
        return mockRequest.put(`/api/v1/products/${data.body._id}`)
          .send(updated)
          .then(data => {
            expect(data.status).toBe(201);
            expect(data.body.name).toBe('gatera');
          });
      });
  });
  
  
  
  it('Deleting the work ' , ()=> {
    let newVal = { name: 'shero' , price : 44 , weight : 85 , quantity_in_stock : 3};
    return mockRequest.post('/api/v1/products')
      .send(newVal)
      .then(data => {
        return mockRequest.delete(`/api/v1/products/${data.body._id}`)
          .then(data => {
            return mockRequest.get(`/api/v1/products/${data.body._id}`)
              .then(data => {
                expect(data.status).toBe(500);
                expect(data.body[0]).toBe(undefined);
  
              });
          });
      });
  
  
  });
  
  
}) ;