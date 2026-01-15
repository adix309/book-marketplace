window.azuriraj = function (id) {
  console.log("Update book:", id);
  console.log(books);
  

  const book = window.books.find(b => b.id === id);
  console.log(book);

 if (!book) {
    console.error("Knjiga nije pronađena", id);
    return;  }

  $("#div_book_form").show();

  $("#book_id").val(book.id);
  $("#title").val(book.title);
  $("#author").val(book.author);
  $("#publisher").val(book.publisher);
  $("#publication_year").val(book.publication_year);
  $("#genre").val(book.genre);
  $("#language").val(book.language);
  $("#condition").val(book.condition);
  $("#price").val(book.price);
  $("#exchange_available").prop("checked", book.exchange_available == 1);
  $("#description").val(book.description);
  $("#status").val(book.status);

  $("#book_submit_button").text("Update Book");

  console.log(book.publisher);

};




window.brisi = function (id) {
  if (!confirm("Are you sure?")) return;
  console.log("Deleting book...");

  $.ajax({
    url: `/users/delete/${id}`,
    method: "DELETE",

    success: () => {
      $(`#book_${id}`).remove(); // Uklanja karticu sa stranice
    },

    error: (e) => {
      console.error(e);
      alert("Error deleting book!!!!!!!!!!!");
    },
  });
};


  
  


$(function () {


  $("#book_cancel_button").click(function (e) {
    $("#div_book_form").slideUp();})


  $("#addBook").click(function(e){
    e.preventDefault();

    $("#book_id").val(""); 
    $("#book_form")[0].reset();
    $("#book_submit_button").text("Dodaj knjigu");

    $("#div_book_form").show();
  })

  $("#book_form").on("submit", function (e) {
    e.preventDefault();
  

    const id = $("#book_id").val(); // ako si klikno addBook ovo ima vrjednost "",ako si update ima id 
    const title = $("#title").val().trim();
    const author = $("#author").val().trim();
    const price = $("#price").val().trim();
    const description = $("#description").val().trim();
    const status = $("#status").val();
    const publication_year = $("#publication_year").val().trim();
    const genre = $("#genre").val().trim();
    const language = $("#language").val().trim();
    const condition = $("#condition").val().trim();
    const exchange_available = $("#exchange_available").prop("checked"); // Ako je checkbox označen
    const publisher = $("#publisher").val().trim();

    

    // Validacija
    if (!title || !author || !price || !status) {
      alert("Title, Author, Price, and Status are required.");
      return;
    }


    const btn = $("#book_submit_button");
    btn.prop("disabled", true).text("Saving...");

    


    if (!id) {
      
      $.ajax({
        
        url: "/users/addbooks",
        method: "POST",
       data: {
          title,
          author,
          price,
          description,
          status,
          publication_year,
          genre,
          language,
          condition,
          exchange_available,
          publisher
        },
        success: (res) => {
            const book = res.book[0];
           
            console.log(book);
            console.log(book[0]);
            
            const badgeClass = book.status === "AKTIVNA" ? "bg-success" : "bg-secondary";

            // Generiši HTML za karticu knjige
const bookCard = `
  <div class="col-md-6 col-lg-4 mb-4" id="book_${book.id}">
    <div class="card h-100 shadow-sm border-0 rounded-4">
      
      <!-- KARTICA BODY -->
      <div class="card-body d-flex flex-column">
        
        <h3 class="card-title mb-2">${book.title}</h3>
        <p class="mb-1"><strong>Autor:</strong> ${book.author}</p>
        <p class="mb-1"><strong>Cijena:</strong> ${book.price} KM</p>
        <p class="mb-3">
          <strong>Status:</strong>
          <span class="badge ${badgeClass}">${book.status}</span>
        </p>
        
        <!-- Godina i Žanr -->
        <div class="d-flex justify-content-between text-muted mb-3">
          <small><strong>Godina izdanja:</strong> ${book.publication_year || 'N/A'}</small>
          <small><strong>Žanr:</strong> ${book.genre || 'N/A'}</small>
        </div>

        <!-- Opis knjige -->
        <p class="small text-muted">
          ${book.description ? (book.description.length > 120 ? book.description.substring(0, 120) + '...' : book.description) : 'Nema opisa'}
        </p>
      </div>
      
      <!-- KARTICA FOOTER -->
      <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
        <!-- Update and Delete buttons -->
        <div class="btn-group">
          <a href="/books/edit/${book.id}" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-pencil-square"></i> Update
          </a>
          <form action="/books/delete/${book.id}" method="POST" class="ms-2" onsubmit="return confirm('Želite li obrisati ovu knjigu?')">
            <button type="submit" class="btn btn-outline-danger btn-sm">
              <i class="bi bi-trash"></i> Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
`;


            $("#booksGrid").prepend(bookCard);

            $("#book_form")[0].reset();
            $("#book_id").val("");
            $("#div_book_form").slideUp();},

        error: (e) => {
            console.error(e);
            alert("Error creating book");
        },

        complete: () => {
          btn.prop("disabled", false).text("Save Book");
        },
      });
    }

    // -------- UPDATE --------
    else {
      $.ajax({
        url: `/users/updatebook/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          id,
          title,
          author,
          price,
          description,
          status,
          publication_year,
          genre,
          language,
          condition,
          exchange_available,
          publisher
        }),

        success: (res) => {
          $("#book_form")[0].reset();
          $("#book_id").val("");
          $("#div_book_form").slideUp();

          location.reload();//mogo bi i ovo promjenit da se ne radi reload 
        },

        error: (e) => {
          console.error(e);
          alert("Error updating book");
        },

        complete: () => {
          btn.prop("disabled", false).text("Save Book");
        },
      });
    }
  });


})



