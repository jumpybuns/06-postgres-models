const request = require('supertest');
const app = require('./app.js');
// const pool = require('./utils/pool.js');
// const fs = require('fs');
const Hamburger = require('./models/Hamburgers.js');

describe('app tests', () => {
//   beforeEach(() => {
//     return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
//   });
//   afterAll(() => {
//     return pool.end();
//   });

  it('POST a hamburger to the body', async() => {
    const response = await request(app)
      .post('/api/hamburger')
      .send({
        name: 'Whopper',
        description: 'greasy af',
        toppings: 'onions'
      });

    expect(response.body).toEqual({
      id: 37,
      name: 'Whopper',
      description: 'greasy af',
      toppings: 'onions'
    });
  });

  it.only('GETS a hamburger from the body by id', async() => {
    const hamburger = await Hamburger.insert({ 
      name: 'Whopper',
      description: 'greasy af',
      topping: 'onions' });
    const response = await request(app)
      .get(`/api/hamburger/${hamburger.id}`);
    
    expect(response.body).toEqual(hamburger);
  });
});
