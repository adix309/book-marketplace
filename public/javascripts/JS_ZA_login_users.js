$(function () {

    $("#loginForm").on("submit",function(e){
        e.preventDefault();
        const LoginDate={
            email : $("#email").val(),
            password : $("#password").val()    }

        $.ajax({
            url:"/users/LoginUser",
            method:"POST",
            data:LoginDate,
            success:function(response){
                console.log(response.message);
                console.log(response.user);
                alert("login successful!");
                window.location.href="/users/profil/";
            },
            error: function (xhr) {
            alert("Login failed: " + xhr.responseText);
        },
        complete: function () {
                console.log("AJAX ZAVRŠEN iz LOGIN (success ili error)"); }
        });


    })


    $("#registration_form").on("submit",function(e){
        e.preventDefault();
        const role = $("input[name='flexRadioDefault']:checked").attr("id");
        console.log(role);
        
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
            bio: $("textarea[name='bio']").val()
        };

        $.ajax({
            url:"/users/RegisterUser",
            method:"POST",
            data:REGData,
            success:function(response){
                alert("Registration successful!");
                window.location.href="/users/usersLogin"
            },
            error: function (xhr) {
            alert("Registration failed: " + xhr.responseText);
            },
            complete: function () {
                console.log("AJAX iz registration ZAVRŠEN (success ili error)");
            }
        });


    })


});

