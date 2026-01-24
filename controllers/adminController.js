
const adminservice = require("../services/adminservice.js");



module.exports = {

    async adminProfil(req, res) {
        const allKupci = await adminservice.getAllKupci();
        const allProdavci = await adminservice.getAllProdavci();

        const alllanguages = await adminservice.getAllLanguages();
        const allgenres = await adminservice.getAllGenres();
        console.log("--------------------");

        
        const onlineUsers = req.app.get("onlineUsers");
        onlineUsers.delete(req.signedCookies.user.id);
        const online = Array.from(onlineUsers.keys());

      


        res.render('adminProfil', { kupci: allKupci, prodavci: allProdavci,alllanguages,allgenres,online });
    },

    async blockUser(req, res) {
        const userId = req.params.id;
        const status = req.body.type;

        console.log("User ID to block:", userId);
        console.log("Block status:", status);

        await adminservice.updateUserStatus(userId, status);

        res.redirect('/admin');
    },
    async deleteLanguage (req, res) {
        try{
        console.log("Received request to delete language");
        const languageId = req.params.id;
        console.log("Deleting language with ID:", languageId);
        await adminservice.deleteLanguage(languageId);
        res.status(200).json({ message: "Language deleted successfully" });
        } catch(err){
            console.error("Error parsing language ID");
            return res.status(400).json({ message: "Invalid language ID" });
        }
        
    },
    async deleteGenre (req, res) {
        try{
        console.log("Received request to delete genre");
        const genreId = req.params.id;
        console.log("Deleting genre with ID:", genreId);
        await adminservice.deleteGenre(genreId);
        res.status(200).json({ message: "Genre deleted successfully" });
        } catch(err){
            console.error("Error parsing genre ID");
            return res.status(400).json({ message: "Invalid genre ID" });
        }
    },

    async addLanguage (req, res) {
        try{
        const { name } = req.body;
        console.log("Adding new language:", name);
        await adminservice.addLanguage(name);
        res.status(201).json({ message: "Language added successfully",name  });
        } catch(err){
            console.error("Error adding language:", err);
            return res.status(500).json({ message: "Error adding language" });
        }   
    },
    async addGenre (req, res) {
        try{
        const { name } = req.body;
        console.log("Adding new genre:", name);
        await adminservice.addGenre(name);
        res.status(201).json({ message: "Genre added successfully",name  });
        } catch(err){
            console.error("Error adding genre:", err);
            return res.status(500).json({ message: "Error adding genre" });
        }
    },
    logout(req, res) {
    res.clearCookie("user");
    res.redirect("/users/login");
},


    
}