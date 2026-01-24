const userservice = require("../services/userservice.js");





module.exports = {



  async profil(req, res) {
    try {
      console.log("---------------------");
      const cookieUser = req.signedCookies.user;
      const user = await userservice.getUserById(cookieUser.id);
      const books = await userservice.getBooksByUser(cookieUser.id);
      const alllanguages = await userservice.getAllLanguages();
      const allgenres = await userservice.getAllGenres();

      const onlineUsers = req.app.get("onlineUsers");
      onlineUsers.delete(req.signedCookies.user.id);
      const online = Array.from(onlineUsers.keys());

      console.log(user );
      let brojKnjigaAktivnih = 0;
      let brojKnjigaProdanih = 0;
      for (let book of books) {
        if (book.status === 'AKTIVNA') {
          brojKnjigaAktivnih++;
        }
        if (book.status === 'PRODANA') {
          brojKnjigaProdanih++;
        }
      }
      console.log("broj aktivnih knjiga je ", brojKnjigaAktivnih);
      console.log("broj prodanih knjiga je ", brojKnjigaProdanih);
      user.brojKnjigaAktivnih = brojKnjigaAktivnih;
      user.brojKnjigaProdanih = brojKnjigaProdanih;

      res.render('ProfilOdUsera', {
        title: 'Users page',
        css: '/stylesheets/Profiluser.css',
        user, books,alllanguages,allgenres,online
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Greška na bazi");
    }
  },




  RenderUserLogin(req, res, next) {
    res.render('loginForm', { title: 'LOGIN' });
  },

  async RenderUserRegister(req, res, next) {
    const jezici = await userservice.getAllLanguages();
    const zanrovi = await userservice.getAllGenres();
    console.log("jezici u renderu", jezici);
    console.log("zanrovi u renderu", zanrovi);
    res.render('registerForm', { title: 'Register', jezici, zanrovi });
  },

  //POST RUTA 
  async LoginUser(req, res, next) {
    try {
      console.log("radi--------------------------");
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send("email and password are required.");
      }


      const user = await userservice.loginUser(email, password);

      //cookie
      res.cookie(
        "user",
        { id: user.id, email: user.email, role: user.role },
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
          role: user.role
        },
      });


    } catch (err) {
      console.error(err);
      if (err.message === "Invalid email or password.") {
        return res.status(401).send(err.message);
      }
      res.status(500).send("Server error during login.");
    }
  },


  //POST RUTA 
  async RegisterUser(req, res, next) {
    try {


      const { first_name, last_name, email, password, age, gender, phone, country, city,
        role, status, bio, selectedGenres, selectedLanguages } = req.body;
        
      if (!email || !password) {
        return res.status(400).send("Email and password are required.");
      }

      const user = await userservice.registerUser(
        first_name, last_name, email, password, age, gender, phone, country, city, role, status, bio, selectedGenres, selectedLanguages);



      res.json({ message: "User registered successfully", user_id: user.id });

    } catch (err) {
      console.error("greska",err);
      return res.status(400).send(err.message);
  
    }

  },

  logout(req, res) {
    res.clearCookie("user");
    res.redirect("/users/login");
  },



  async addbooks(req, res) {
    try {
      const seller_id = req.signedCookies.user.id;
      const { title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher } = req.body;
      console.log(title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);
      console.log(genre,language);

      const newBook = await userservice.addbooks(seller_id, title,
        author,
        price,
        description,
        status,
        publication_year,
        genre,
        language,
        condition,
        exchange_available, publisher); 
      
        console.log("ovo je iz kontrolera ono sto se vrati ",newBook);

      res.status(201).json({
        message: "Book added successfully",
        book: newBook
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding book" });
    }



  },

  async updatebook(req, res) {
    try {

      const { id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher } = req.body;
      
      if (!id || !price || !publication_year) {
        throw new Error('iz controlera Invalid input: id, price, or publication_year is missing or not a number');
      }
      const updatebook = await userservice.updatebook(id, title, author, price, description, status, publication_year, genre, language, condition, exchange_available, publisher);
      res.status(201).json({
        message: "Book added successfully",
        book: updatebook
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding book" });
    }

  },
  async deletebook(req, res) {
    try {
      const id = req.params.id;
      await userservice.deletebook(id);
      return res.json({ success: true });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async cart(req, res) {
    try {
      const seller_id = req.signedCookies.user.id;
      console.log("seler id je ", seller_id);
      const MyPartFromCart = await userservice.MyPartFromCart(seller_id);
      //const BuyersFrom  = await userservice.allBuyerID();
      res.render('CartForSeller', { MyPartFromCart });


    } catch (err) { res.status(500).json({ error: "Internal server error" }); }

  },

  async setOrder(req, res) {
    const seller_id = req.signedCookies.user.id;
    const book_id = req.body.id;
    const stanje = req.body.stanje

    const buyer_id = await userservice.buyerID(seller_id, book_id);
    console.log("seler id je ", seller_id);
    console.log("stanje je ", stanje);
    console.log("book id je ", book_id);
    console.log("buyerID ", buyer_id);

    

/*
stavio triger na orders kad se tu nesto upise ,da se taj item   brise iz cart_items..znaci nesto ode u orders nema ga vise u nicijoj korpi

CREATE OR REPLACE FUNCTION trg_orders_delete_cart_item()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM cart_items
    WHERE buyer_id = NEW.buyer_id
      AND seller_id = NEW.seller_id
      AND book_id = NEW.book_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_insert_orders_delete_cart
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION trg_orders_delete_cart_item();

*/


/*
  sad zelim da uradim triger ako je prihvacena narudjba da se promjeni status te knjige u tabli books

CREATE OR REPLACE FUNCTION trg_orders_set_book_sold()
RETURNS TRIGGER AS $$
BEGIN
    -- ako je order prihvacen
    IF NEW.status = 'PRIHVACENA' THEN
        UPDATE books
        SET status = 'PRODANA'
        WHERE id = NEW.book_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;



CREATE TRIGGER after_insert_orders_set_book_sold
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION trg_orders_set_book_sold();


*/

    await userservice.setOrder(buyer_id, seller_id, book_id, stanje);
    return res.json({ success: true });

  },


  async oldOrders(req,res){
    const seller_id = req.signedCookies.user.id;
    const oldOrders = await userservice.oldOrders(seller_id);
    res.render('oldOrders',{oldOrders});



  }


}