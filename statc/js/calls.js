var request;
//     // Abort any pending request
if (request) {
  request.abort();
}

$("#fid").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Get form data
  var name = $("#fullname").val();
  var company = $("#cname").val();
  var email = $("#email").val();
  var password = $("#pass").val();
  //   name, company, email, password;
  // Make Ajax request to signup API
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/new-user`,
    data: {
      name: name,
      email: email,
      password: password,
      company: company,
    },
    success: function (response) {
      // console.log(response)
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Please check your email for Verification",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        location.replace("./login.html");
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      //   console.log(response.responseJSON.error);
      if (response.responseJSON.error == "User already exists") {
        Swal.fire({
          title: "Error!",
          text: "Email Already Registered",
          icon: "error",
        });
      }
      //   if (response.status == 500) {
      //     Swal.fire({
      //       title: "Sign Up Failed!",
      //       text: response.responseJSON.message,
      //       icon: "error",
      //     });
      //   }
    },
  });
});

$("#forgotpasswordid").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var rest_passwordenemail = document.getElementById("email12").value;
  //   name, company, email, password;
  // Make Ajax request to signup API
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/forgot-password`,
    data: {
      email: rest_passwordenemail,
    },
    success: function (response) {
      // console.log(response)
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Please check your Email",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        // alert("asdf");
        location.replace("./login.html");
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      console.log(response);
      Swal.fire({
        title: "Error!",
        text: "An Unexpected Error Occured",
        icon: "error",
      });
    },
  });
});

$("#newpassword").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var confirm_password = document.getElementById("confirm_password").value;
  var Password = document.getElementById("Password").value;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("name");
  // console.log(product);
  if (Password !== confirm_password) {
    Swal.fire({
      title: "Error!",
      text: "Passwords are not same",
      icon: "error",
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "PUT",
      url: `${baseurl}/reset-password`,
      data: {
        token: product,
        password: Password,
        confirm_password: confirm_password,
      },
      success: function (response) {
        // console.log(response)
        document.getElementById("loader1").style.visibility = "hidden";
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Password Changed Successfully",
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          // alert("asdf");
          location.replace("./login.html");
        });
      },

      error: function (response) {
        document.getElementById("loader1").style.visibility = "hidden";
        console.log(response);
        Swal.fire({
          title: "Error!",
          text: "An Unexpected Error Occured",
          icon: "error",
        });
      },
    });
  }
});

$("#loginform").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;

  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/user-login`,
    data: {
      email: email,
      password: pass,
    },
    success: function (response) {
      // console.log(response.token);
      document.cookie = `token=${response.token}`;
      document.cookie = `user=${response.user}`;
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "Logged In",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        // alert("asdf");
        location.replace("./index.html");
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      console.log(response);
      Swal.fire({
        title: "Error!",
        text: "An Unexpected Error Occured",
        icon: "error",
      });
    },
  });
});

function logoutcall() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  window.location.replace("./login.html");
  // Prevent default form submission
  //   var token = getCookie("token");
  //   console.log(token);
  //   document.getElementById("loader1").style.visibility = "visible";
  //   $.ajax({
  //     type: "get",
  //     url: `${baseurl}/logout`,
  //     headers: {
  //       user: token,
  //     },
  //     success: function (response) {
  //       console.log(response.token);
  //       document.getElementById("loader1").style.visibility = "hidden";
  //       Swal.fire({
  //         icon: "success",
  //         title: "Successful!",
  //         text: "Logged Out",
  //         // allowOutsideClick: false,
  //       });
  //       $("button.swal2-confirm").click(function () {
  //         // alert("asdf");
  //         location.replace("./login.html");
  //       });
  //     },
  //     error: function (response) {
  //       document.getElementById("loader1").style.visibility = "hidden";
  //       console.log(response);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "An Unexpected Error Occured",
  //         icon: "error",
  //       });
  //     },
  //   });
}

function settoken() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get("name");
  document.cookie = `token=${product}`;
  location.replace("./index.html");
}
