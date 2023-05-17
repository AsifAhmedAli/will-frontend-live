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
// console.log(getCookie("token"));
if (getCookie("token") !== "") {
  document.getElementById("logoutlist").classList.remove("d-none");
  document.getElementById("loginlist").classList.add("d-none");
} else {
  document.getElementById("logoutlist").classList.add("d-none");
  document.getElementById("loginlist").classList.remove("d-none");
}
