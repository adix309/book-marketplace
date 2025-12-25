
window.azuriraj = function (id) {
  console.log("Update book:", id);

  const card = $(`#book_${id}`);
  const title = card.find(".card-title").text().trim();
  const author = card.find("p").eq(0).text().replace("Autor:", "").trim();
  const price = card.find("p").eq(1).text()
    .replace("Cijena:", "")
    .replace("KM", "")
    .trim();

  const status = card.find(".badge").text().trim();


  $("#div_book_form").show();


  $("#book_id").val(id);
  $("#title").val(title);
  $("#author").val(author);
  $("#price").val(price);
  $("#status").val(status);

  // promijeni dugme
  $("#book_submit_button").text("Update Book");
};


window.brisi = function (id) {
   if (!confirm("Are you sure?")) return;
  console.log("brisi");

  $.ajax({
    url: `/users/delete/${id}`,
    method: "DELETE",

    success: () => {
      $(`#book_${id}`).remove();
    },

    error: (e) => {
      console.error(e);
      alert("Error deleting subject!");
    },
  });
}
  
  


$(function () {


  $("#book_cancel_button").click(function (e) {
    $("#div_book_form").slideUp();})


  $("#addBook").click(function(e){
    e.preventDefault();

    $("#book_id").val(""); 
    $("#book_form")[0].reset();
    $("#book_submit_button").text("Save Book");

    $("#div_book_form").show();
  })

  $("#book_form").on("submit", function (e) {
    e.preventDefault();


    const id = $("#book_id").val(); // ako postoji → UPDATE
    const title = $("#title").val().trim();
    const author = $("#author").val().trim();
    const price = $("#price").val().trim();
    const description = $("#description").val().trim();
    const status = $("#status").val();
   


    if (!title || !author || !price) {
      alert("Title, Author and Price are required.");
      return;
    }


    const btn = $("#book_submit_button");
    btn.prop("disabled", true).text("Saving...");

    


    if (!id) {
      
      $.ajax({
        
        url: "/users/addbooks",
        method: "POST",
        data: {title,author,price,description,status},
        success: (res) => {
            const book = res.book[0];
           
            console.log(book);
            console.log(book[0]);
            const badgeClass =
              book.status === "active" ? "bg-success" : "bg-secondary";

            const bookCard = `
              <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm border-0">
                  <div class="card-body d-flex flex-column">

                    <h3 class="card-title mb-2">${book.title}</h3>

                    <p class="mb-1">
                      <strong>Autor:</strong> ${book.author}
                    </p>

                    <p class="mb-1">
                      <strong>Cijena:</strong> ${book.price} KM
                    </p>

                    <p class="mb-3">
                      <strong>Status:</strong>
                      <span class="badge ${badgeClass}">
                        ${book.status} 
                      </span>
                    </p>

                    <div class="mt-auto d-flex gap-2">
                      <a href="/books/edit/${book.id}"
                        class="btn btn-outline-primary btn-sm w-50">
                        Update
                      </a>

                      <form action="/books/delete/${book.id}"
                            method="POST"
                            class="w-50"
                            onsubmit="return confirm('Jesi siguran?');">

                        <button type="submit"
                                class="btn btn-outline-danger btn-sm w-100">
                          Delete
                        </button>
                      </form>
                    </div>

                  </div>
                </div>
              </div> `;

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

