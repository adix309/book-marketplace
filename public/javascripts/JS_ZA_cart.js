function izbaci(id) {
    console.log("u fji----------------------------");

    $.ajax({
        url: "/buyer/cart/DeleteItem",
        method: "DELETE",
        contentType: "application/json",
        data: JSON.stringify({
            bookId: id
        }),
        success: function (data) {
            console.log("izbaceno jeeeee ");
            alert("izbacili smoooo");
            $("#book_" + id).remove();
            

        }, error: function (err) {

            alert("Greska pri izbacivanju iz korpe");
        }
    });

}

function naruci(){
    console.log("stiglo");

    $.ajax({
        url: "/buyer/cart/OrderItem",
        method: "PATCH",
        
    
        success: function (data) {
            alert("Naruceno je");
            location.reload();
            
            

        }, error: function (err) {

            alert("Greska pri narucivanju iz korpe");
        }
    });


}


function submitReview(e, form) {
  e.preventDefault(); 
     
  $.ajax({
    url: "/buyer/review",   
    method: "PATCH",
    data:$(form).serialize(),//parsira formu da bi bila citljivija  
    success: function () {
      alert("ocjenio si uspjesno ");
     $(form).find("input, select, button").prop("disabled", true);
    },
    error: function () {
      alert("Greška pri slanju ocjene");
    }
  });
}
