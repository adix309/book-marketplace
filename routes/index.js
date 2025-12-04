var express = require('express');
var router = express.Router();
const pool = require("../db/db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Used books app – home' });
});

router.get('/about',function(req,res,next){
  res.render('about',{title:'About-Used books app'});
})

router.get('/testBaza', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Greška na bazi");
    }
});





 

module.exports = router;
