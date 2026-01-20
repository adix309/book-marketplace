$(function () {

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        const LoginDate = {
            email: $("#email").val(),
            password: $("#password").val()
        }

        $.ajax({
            url: "/users/LoginUser",
            method: "POST",
            data: LoginDate,
            success: function (response) {
                console.log(response.message);
                console.log(response.user);
                alert("login successful!");
                if (response.user.role === "Kupac") {
                    window.location.href = "/buyer";
                }
                else if (response.user.role === "Prodavac") {
                    window.location.href = "/users/profil/";
                } else if (response.user.role === "ADMIN") {
                    window.location.href = "/admin";
                }
            },
            error: function (xhr) {
                alert("Login failed: " + xhr.responseText);
            },
            complete: function () {
                console.log("AJAX ZAVRŠEN iz LOGIN (success ili error)");
            }
        });


    })

    // 🔹 SHOW / HIDE kupac fields kad se mijenja role
    $("input[name='role']").on("change", function () {
        const role = $("input[name='role']:checked").val();

        if (role === "Kupac") {
            $("#kupac-fields").slideDown();
        } else {
            $("#kupac-fields").slideUp();
        }
    });



    $("#registration_form").on("submit", function (e) {
        e.preventDefault();
        const role = $("input[name='role']:checked").val();


        const formData = new FormData(this);
        


        const selectedGenres = formData.getAll("genre[]");     // [ "3", "5" ]
        const selectedLanguages = formData.getAll("language[]");  // [ "1", "2" ]

        console.log(selectedGenres," ------------------- ",selectedLanguages);

        const REGData = {
            first_name: $("input[name='first_name']").val(),
            last_name: $("input[name='last_name']").val(),
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val(),
            age: $("input[name='age']").val(),
            gender: $("select[name='gender']").val(),
            phone: $("input[name='phone']").val(),
            country: $("input[name='country']").val(),
            city: $("input[name='city']").val(),
            status: $("input[name='status']").val(),
            role: role,
            bio: $("textarea[name='bio']").val(),
            selectedGenres: selectedGenres,
            selectedLanguages: selectedLanguages,
        };

        $.ajax({
            url: "/users/RegisterUser",
            method: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(REGData),
            success: function (response) {
                alert("Registration successful!");
                window.location.href = "/users/usersLogin"
            },
            error: function (xhr) {
                console.log("evo ga ovdje ");
                alert("Registration failed: " + xhr.responseText);
            },
            complete: function () {
                console.log("AJAX iz registration ZAVRŠEN (success ili error)");
            }
        });


    })


});

