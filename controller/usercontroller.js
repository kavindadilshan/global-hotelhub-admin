/**
 * Oauth by user
 */
// .....................login Handler..........

function login() {

    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();

    if (username === "" && password === "") {

        setTimeout(function () {

            swal({
                title: "Sorry",
                text: "Please Enter Your Username and Password !",
                type: "error"
            }, function () {
                window.location = "login.html";
            });
        }, 800);

    } else{
        var ajaxConfig={
            method:"POST",
            contentType:'application/json; charset=utf-8',
            url:Server+"/api/v1/authorize",
            async:true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic QWRtaW5pc3RyYXRvcjo=",
            },
            data: $.param({username: username, password: password, grant_type: 'password'
            })
        }
        $.ajax(ajaxConfig).done(function (response) {


                let now = new Date();
                let time = now.getTime();
                let expireTime = time + 1000 * 1800;
                now.setTime(expireTime);
                let x= now;
                //

                Cookies.set('token', response.access_token,{expires:x});
                Cookies.set('id', response.id,{expires:x});
                Cookies.set('fullName', response.fullName,{expires:x});
                Cookies.set('mobileNumber', response.mobileNumber,{expires:x});
                Cookies.set('email',response.email,{expires:x});

                console.log(response.access_token);
                console.log(Cookies.get('token'));

                window.location.href="index.html";
                swal.close();



        }).fail(function (text) {

            swal({
                title: "Sorry",
                text: "Please Check Your Username and Password !",
                type: "error"
            }, function () {
                window.location = "login.html";
            });
        }, 800);
    }
}

function checktimout() {

    let token=Cookies.get('token');

    if(token === undefined ) {
        window.location.href = "login.html"
    }
}