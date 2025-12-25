const query=require("../db/dao/dao.users.js");
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports={

async testpoziv(){
    return query.findall();
},

async loginUser(email, password){
    const user = await query.GetByEmail(email);
    if(!user){
        throw new Error("Invalid email or password."); } 
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {throw new Error("Invalid email or password."); }
    return user;

},

async registerUser(first_name, last_name, email, password, age ,gender,phone,country,city,role,status,bio){
    const existing = await query.GetByEmail(email);
    if (existing) {
      throw new Error("Email already in use."); }
    
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await query.InsertUser(first_name, last_name, email, hashedPassword, age ,gender,phone,country,city,role,status,bio);
    return newUser;


},


async  getUserById(id) {
    const res = await query.getUserById(id);
    return res;

  
  return result.rows[0];
},

async getBooksByUser(id){
    
    return await query.getBooksByUser(id);

},

async addbooks(seller_id,title,author,price,description,status){
    return await query.addbooks(seller_id,title,author,price,description,status);
},

async updatebook(id,title,author,price,description,status){
    return await query.updatebook(id,title,author,price,description,status);
},
async deletebook(id){
    return await query.deletebook(id);
}


}