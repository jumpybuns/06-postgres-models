const pool = require('../utils/pool.js');

module.exports = class Hamburger {

    id;
    name;
    description;
    toppings;


    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.description = row.description;
      this.toppings = row.toppings;
    }

    static async insert({ name, description, toppings }) {
      const { rows } = await pool.query(
        'INSERT INTO hamburger (name, description, toppings) VALUES ($1, $2, $3) RETURNING *',
        [name, description, toppings]
      );
      return new Hamburger(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM hamburger WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`No burgers like ${id}, Pal`);
      return new Hamburger(rows[0]);
    }

    static async update(id, { name, description, toppings }) {
      const { rows } = await pool.query(
        `UPDATE hamburger
            SET name=$1,
            description=$2,
            toppings=$3
            WHERE id=$4
            RETURNING *`,
        [name, description, toppings, id]
            
      );

      if(!rows[0]) throw new Error(`No ${id} for you, Pal`);
      return new Hamburger(rows[0]);
    }


    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM hamburger WHERE id=$1 RETURNING *',
        [id]
      );

      return new Hamburger(rows[0]);
    }
};

