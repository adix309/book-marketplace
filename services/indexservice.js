const pool = require("../db/db");


module.exports={

async testpoziv(){
    return pool.query("SELECT * FROM users");

}



}