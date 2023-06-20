function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
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
      // console.log(response.user);
      document.cookie = `token=${response.token}`;
      document.cookie = `user=${response.user}`;
      document.cookie = `id=${response.user.id}`;
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
      // console.log(response);
      if (response.responseJSON.error == "Invalid email or password") {
        Swal.fire({
          title: "Error!",
          text: "Incorrect Password",
          icon: "error",
        });
      } else if (
        response.responseJSON.error ==
        "you are not registered, please register first"
      ) {
        Swal.fire({
          title: "Not Registered!",
          text: "You are not registered, please register first",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "An Unexpected Error Occured",
          icon: "error",
        });
      }
    },
  });
});

function logoutcall() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
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
  const id = urlParams.get("id");
  // console.log(id);
  document.cookie = `token=${product}`;
  document.cookie = `id=${id}`;
  location.replace("./index.html");
}
//get-in-touch

$("#getintouch").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var fname = document.getElementById("exampleFormControlInput1").value;
  var lname = document.getElementById("exampleFormControlInput11").value;
  var email = document.getElementById("exampleFormControlInput12").value;
  var msg = document.getElementById("exampleFormControlTextarea13").value;

  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "POST",
    url: `${baseurl}/get-in-touch`,
    data: {
      first_name: fname,
      last_name: lname,
      email: email,
      message: msg,
    },
    success: function (response) {
      // console.log(response.token);
      document.getElementById("loader1").style.visibility = "hidden";
      Swal.fire({
        icon: "success",
        title: "Successful!",
        text: "We will get back to you!",
        // allowOutsideClick: false,
      });
      $("button.swal2-confirm").click(function () {
        // alert("asdf");
        window.location.reload();
      });
    },

    error: function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      // console.log(response);
      Swal.fire({
        title: "Error!",
        text: "An Unexpected Error Occured",
        icon: "error",
      });
    },
  });
});

$("#changepassform").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var newpass = document.getElementById("newpass").value;
  var confirmpass = document.getElementById("confirmpass").value;
  var currentpass = document.getElementById("currentpass").value;
  var id = getCookie("id");
  // console.log(id);
  if (id == "" || typeof id == "undefined" || id == null) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Please Login!",
      // allowOutsideClick: false,
    });
    $("button.swal2-confirm").click(function () {
      // alert("asdf");
      window.location.replace("./login.html");
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "POST",
      url: `${baseurl}/change-password`,
      data: {
        id: id,
        current_password: currentpass,
        confirm_new_password: confirmpass,
        new_password: newpass,
      },
      success: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Password Changed Successfully!",
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          // alert("asdf");
          window.location.reload();
        });
      },

      error: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        // console.log(response);
        if (response.responseJSON.message == "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Login!",
            // allowOutsideClick: false,
          });
          $("button.swal2-confirm").click(function () {
            // alert("asdf");
            window.location.replace("./login.html");
          });
        } else if (response.responseJSON.error == "Invalid current password") {
          Swal.fire({
            title: "Error!",
            text: "Old Password is Incorrect",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An Unexpected Error Occured",
            icon: "error",
          });
        }
      },
    });
  }
});

// change-email

$("#newemailform").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var newchangeemail = document.getElementById("newchangeemail").value;
  document.getElementById("newemail").value = newchangeemail;
  newemail;
  var id = getCookie("id");
  $("#newEmailVerificationModal").modal("hide");
  // console.log(id);
  if (id == "" || typeof id == "undefined" || id == null) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Please Login!",
      // allowOutsideClick: false,
    });
    $("button.swal2-confirm").click(function () {
      // alert("asdf");
      window.location.replace("./login.html");
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "POST",
      url: `${baseurl}/send-verification-code`,
      data: {
        id: id,
        current_email: newchangeemail,
      },
      success: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Code sent. Please check your email!",
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          // alert("asdf");
          $("#verificationModal").modal("show");
          // window.location.reload();
        });
      },

      error: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        // console.log(response);
        if (response.responseJSON.message == "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Login!",
            // allowOutsideClick: false,
          });
          $("button.swal2-confirm").click(function () {
            // alert("asdf");
            window.location.replace("./login.html");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An Unexpected Error Occured",
            icon: "error",
          });
        }
      },
    });
  }
});

// verificationcodeform

$("#verificationcodeform").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var verificationcode = document.getElementById("verificationcode").value;
  var newemail = document.getElementById("newemail").value;

  var id = getCookie("id");
  $("#verificationModal").modal("hide");
  // console.log(id);
  if (id == "" || typeof id == "undefined" || id == null) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Please Login!",
      // allowOutsideClick: false,
    });
    $("button.swal2-confirm").click(function () {
      // alert("asdf");
      window.location.replace("./login.html");
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "POST",
      url: `${baseurl}/change-email`,
      data: {
        id: id,
        new_email: newemail,
        verification_code: verificationcode,
      },
      success: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        Swal.fire({
          icon: "success",
          title: "Successful!",
          text: "Email Updated!",
          // allowOutsideClick: false,
        });
        $("button.swal2-confirm").click(function () {
          // alert("asdf");
          // $("#verificationModal").modal("show");
          window.location.replace("./login.html");
        });
      },

      error: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        // console.log(response);
        if (response.responseJSON.message == "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Login!",
            // allowOutsideClick: false,
          });
          $("button.swal2-confirm").click(function () {
            // alert("asdf");
            window.location.replace("./login.html");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An Unexpected Error Occured",
            icon: "error",
          });
        }
      },
    });
  }
});

// get_user_settings_page

function getdataoftheuser() {
  var id = getCookie("id");
  // console.log(id);
  if (id == "" || typeof id == "undefined" || id == null) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Please Login!",
      // allowOutsideClick: false,
    });
    $("button.swal2-confirm").click(function () {
      // alert("asdf");
      window.location.replace("./login.html");
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "get",
      url: `${baseurl}/get-user/${id}`,
      success: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        document.getElementById("currentemail").value = response.email;
        document.getElementById("currentname").value = response.name;
      },

      error: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        console.log(response);
        if (response.responseJSON.message == "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Login!",
            // allowOutsideClick: false,
          });
          $("button.swal2-confirm").click(function () {
            // alert("asdf");
            window.location.replace("./login.html");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An Unexpected Error Occured",
            icon: "error",
          });
        }
      },
    });
  }
}

//get_user_boolean_search_page
function getdataoftheuser1() {
  var id = getCookie("id");
  // console.log(id);
  if (id == "" || typeof id == "undefined" || id == null) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Please Login!",
      // allowOutsideClick: false,
    });
    $("button.swal2-confirm").click(function () {
      // alert("asdf");
      window.location.replace("./login.html");
    });
  } else {
    document.getElementById("loader1").style.visibility = "visible";
    $.ajax({
      type: "get",
      url: `${baseurl}/get-user/${id}`,
      success: function (response) {
        // console.log(response);
        getchathistory(0);
        document.getElementById("loader1").style.visibility = "hidden";
      },

      error: function (response) {
        // console.log(response);
        document.getElementById("loader1").style.visibility = "hidden";
        console.log(response);
        if (response.responseJSON.message == "Unauthorized") {
          Swal.fire({
            icon: "error",
            title: "Failed!",
            text: "Please Login!",
            // allowOutsideClick: false,
          });
          $("button.swal2-confirm").click(function () {
            // alert("asdf");
            window.location.replace("./login.html");
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "An Unexpected Error Occured",
            icon: "error",
          });
        }
      },
    });
  }
}
