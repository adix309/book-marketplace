const indexService = require("../services/indexservice.js");


module.exports={

indexfunction(req, res, next) {
    res.render('index', { title: 'Used books app – home-Doslo preko kontrolera' });
},

async testBaze(req,res){
    try {         
        const result = await indexService.testpoziv();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Greška na bazi");
    }
}

}