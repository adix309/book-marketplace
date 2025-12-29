const userservice = require("../services/userservice.js");





module.exports={



async profil(req,res){
    try { 
        const cookieUser = req.signedCookies.user;
        const user = await userservice.getUserById(cookieUser.id);

        const books = await userservice.getBooksByUser(cookieUser.id);

        


        res.render('ProfilOdUsera', {
        title: 'Users page',
        css: '/stylesheets/Profiluser.css',
        user,books    });      
    } catch (err) {
        console.error(err);
        res.status(500).send("Greška na bazi");
    }
},




RenderUserLogin(req,res,next){
    res.render('loginForm',{title:'LOGIN' });
},

RenderUserRegister(req,res,next){
    res.render('registerForm',{title:'Register'});
},

//POST RUTA 
async LoginUser(req,res,next){
    try{
        console.log("radi--------------------------");
        const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).send("email and password are required.");}

        
        const user = await userservice.loginUser(email, password);
       
       //cookie
       res.cookie(
        "user",
        {id: user.id, email: user.email,role:user.role},
        {
        httpOnly: true,
        signed: true,
        maxAge: 5 * 60 * 60 * 1000 // 5h        
        }
       );

        
        return res.json({
        message: "Login successful",
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role:user.role
        },
      });


    }catch(err){
        console.error(err);
        if (err.message === "Invalid email or password.") {
            return res.status(401).send(err.message); }
         res.status(500).send("Server error during login.");
    }
},


//POST RUTA 
async RegisterUser(req,res,next){
    try{
      

      const { first_name, last_name, email, password, age ,gender,phone,country,city,
        role,status,bio,selectedGenres,selectedLanguages } = req.body;
      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }
      
    
       const user = await userservice.registerUser(
        first_name, last_name, email, password, age ,gender,phone,country,city,role,status,bio,selectedGenres,selectedLanguages );

        

        res.json({ message: "User registered successfully", user_id: user.id });

    }catch(err){
        console.error(err);
    }

},

logout(req, res) {
    res.clearCookie("user");
    res.redirect("/users/login");
},



async addbooks(req,res){
    try{
    const seller_id = req.signedCookies.user.id ;
    const {title,author,price,description,status,publication_year,genre, language,condition,exchange_available,publisher} = req.body;
  
    const newBook = await userservice.addbooks(seller_id,title,
          author,
          price,
          description,
          status,
          publication_year,
          genre,
          language,
          condition,
          exchange_available,publisher);
        
    res.status(201).json({
      message: "Book added successfully",
      book: newBook
    });

    }catch(err){ console.error(err);
    res.status(500).json({ message: "Error adding book" });}

    

},

async updatebook(req,res){
    try{
    
    const { id,title,author,price,description,status,publication_year,genre, language,condition,exchange_available,publisher} =req.body;  
    
    console.log("publisher  izdanja ",publisher);
    if (!id || !price || !publication_year) {
    throw new Error('iz controlera Invalid input: id, price, or publication_year is missing or not a number');
  }
    const updatebook = await userservice.updatebook(id,title,author,price,description,status,publication_year,genre, language,condition,exchange_available,publisher);
    res.status(201).json({
      message: "Book added successfully",
      book: updatebook
    });

    }catch(err){ console.error(err);
    res.status(500).json({ message: "Error adding book" });}

},
async deletebook(req,res){
    try {
      const id = req.params.id;
      await userservice.deletebook(id);
      return res.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Internal server error" });     }
  }


}