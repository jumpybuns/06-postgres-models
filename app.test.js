const request = require('supertest');
const app = require('./app.js');
const pool = require('./utils/pool.js');
const fs = require('fs');
const Hamburger = require('./models/Hamburgers.js');

describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('POST a hamburger to the body', async() => {
    const response = await request(app)
      .post('/api/hamburger')
      .send({
        name: 'Whopper',
        description: 'greasy af',
        toppings: 'onions'
      });

    expect(response.body).toEqual({
      id: 49,
      name: 'Whopper',
      description: 'greasy af',
      toppings: 'onions'
    });
  });

  it('GETS a hamburger from the body by id', async() => {
    const hamburger = await Hamburger.insert({ 
      name: 'Whopper',
      description: 'greasy af',
      topping: 'onions' });
    const response = await request(app)
      .get(`/api/hamburger/${hamburger.id}`);
    
    expect(response.body).toEqual(hamburger);
  });

  it('PUTS a hamburger in the body not your body', async() => {
    const hamburger = await Hamburger.insert({
      name: 'Big Mac',
      description: 'sleazy af',
      topping: 'special sauce' 

    });
    const response = await request(app)
      .put(`/api/hamburger/${hamburger.id}`)
      .send({
        name: 'Big Mac',
        description: 'sleazy af',
        toppings: 'tomato'
      });

    expect(response.body).toEqual({    
      ...hamburger,
      name: 'Big Mac',
      description: 'sleazy af',
      toppings: 'tomato'
    });
  });
});
