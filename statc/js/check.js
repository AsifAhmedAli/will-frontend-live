// let x12 = document.cookie;

// console.log( x12);

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
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
// var as = getCookie("user");
// console.log(JSON.stringify(as));
if (getCookie("token") !== "") {
  document.getElementById("logoutlist").classList.remove("d-none");
  document.getElementById("loginlist").classList.add("d-none");
  document.getElementById("profile_settings").classList.remove("d-none");
} else {
  document.getElementById("sevcisa").classList.remove("d-none");
  document.getElementById("logoutlist").classList.add("d-none");
  document.getElementById("loginlist").classList.remove("d-none");
}
