function openBookModal(book) {

  
  $("#modalTitle").text(book.title || "—");
  $("#modalAuthor").text(book.author || "—");
  if (Number(book.price) === 0) {
    $("#modalPrice").text("Razmjena");
  } else {
    $("#modalPrice").text(book.price + " KM");
  }

  $("#modalStatus").text(book.status || "—");

  // OSTALO
  $("#modalGenre").text(book.genre || "—");
  $("#modalLanguage").text(book.language || "—");
  $("#modalYear").text(book.publication_year || "—");
  $("#modalCondition").text(book.condition ?? "—");

  $("#modalExchange").text(
    book.exchange_available ? "DA" : "NE"
  );

  $("#modalDescription").text(
    book.description || "Nema opisa"
  );

  // DUGME KUPI (primjer logike)
  if (book.status !== "AKTIVNA") {
    $("#buyButton").prop("disabled", true).text("Nedostupno");
  } else {
    $("#buyButton").prop("disabled", false).text("Kupi knjigu");  }


     
  $("#buyButton")
    .off("click") // skini stare evente
    .on("click", function () {
    

      novaFunkcija(book);
    });
  // PRIKAŽI MODAL
  $("#bookModal").modal("show");
}


$("#filterForm").on("submit", function (e) {
  e.preventDefault();

  const filters = {
    genre: $("#filterGenre").val(),
    language: $("#filterLanguage").val(),
    priceFrom: $("#priceFrom").val(),
    priceTo: $("#priceTo").val(),
    search: $("#searchText").val()
  };

  console.log("Šaljem serveru:", filters);

  $.ajax({
    url: "",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(filters),
    success: function (data) {
      console.log("Rezultat:", data);
      // ovdje kasnije renderaš knjige
    }
  });
});


function novaFunkcija(book){


  $.ajax({
    url: "/buyer/addToCart",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
    bookId: book.id
  }),

    success: function (data) {
      console.log("Rezultat:", data);
$("#buyAlert").toast("show"); 
    },
    error:function(err){
      console.log("ne mozes dodat tu knjigu ");

      alert("Ne mogu dodati u korpu!")
    }
  });

}

