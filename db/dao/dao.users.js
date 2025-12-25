const pool = require('../db');


module.exports = {
  
async findall() {
  const res = await pool.query(
    'SELECT * FROM users' );
   return res.rows;  
},

async GetByEmail(emaill,password){

  //console.log(emaill);
   const res = await pool.query(
    'SELECT * FROM users WHERE email = $1', [emaill]);
   return res.rows[0] || null;; 
},


async InsertUser(
    first_name,
    last_name,
    email,
    password,      
    age,
    gender,
    phone,
    country,
    city,
    role,
    status,
    bio
) {

    const result = await pool.query(
        `INSERT INTO users (
            first_name,last_name,email,password_hash,age,gender,phone,country,city,role,status,bio        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
        )
        RETURNING 
            id,
            first_name,
            last_name,
            email,
            role,
            status`,
        [
            first_name,
            last_name,
            email,
            password,   
            age,
            gender,
            phone,
            country,
            city,
            role,
            status,
            bio
        ]
    );

    return result.rows[0];
},



async  getUserById(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
},

async getBooksByUser(id){
  const result = await pool.query(
    'SELECT * FROM books   WHERE seller_id = $1',
    [id]
  );
  
  return result.rows;
},

async addbooks(seller_id,title,author,price,description,status){
 const result =await pool.query('INSERT INTO books (seller_id,title,author,price,description,status) VALUES  ($1,$2,$3,$4,$5,$6) RETURNING *',[seller_id,title,author,price,description,status] );
  return result.rows;

},

async updatebook(id, title, author, price, description, status) {
  const result = await pool.query(
    `
    UPDATE books
    SET
      title = $2,
      author = $3,
      price = $4,
      description = $5,
      status = $6
    WHERE id = $1
    RETURNING * `,
    [id, title, author, price, description, status]
  );

  return result.rows[0];
},

async deletebook(id) {
  const result = await pool.query(
    `
    DELETE FROM books
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  return result.rows[0];
}






};
