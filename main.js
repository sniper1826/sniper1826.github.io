// Golden Rule: If the code works, Don't touch it.

if (!localStorage.getItem("database")) {
  data = document.createElement("script")
  data.setAttribute("src", "./course_db.js")
  document.head.appendChild(data)

}

Logged_in = false;
keys = { "admin": "123", "sniper": "sniper" }

function change() {

  const start = document.getElementById("start");
  start.style.opacity = 0;
  start.style.display = "none";
  const body = document.getElementById("body")
  body.style.display = "block";

}
setTimeout(() => change(), 2000);

function manage_course() {
  if (Logged_in) {
    window.
      window.open("./manage_courses/manage_courses.html", "_Self")
  }
  else {
    alert("Permission Denied: Not logged in")
  }
}

function closelog() {

  logpage = document.getElementById("login-wrap")
  logpage.style.top = "-25vw";
  document.getElementById("body").style.display = "block";

};
function logout() {

  Logged_in = false
  alert("logged out")
  const log_element = document.getElementById("login_home")
  log_element.textContent = "Log In"
  log_element.setAttribute("onclick", "login_home()")


}
function login() {

  const username = document.getElementById('username')
  const password = document.getElementById('password')

  if (keys[username.value] == password.value) {
    username.value = null
    password.value = null
    Logged_in = true;
    alert("success");
    closelog();
    
    log_element = document.getElementById("login_home")
    log_element.textContent = "Log Out"
    log_element.setAttribute("onclick", "logout()")

  }
  else {
    alert("Invalid Credentials")
  }

}

function login_home() {
  logpage = document.getElementById("login-wrap")
  logpage.style.top = "20vw";
  document.getElementById("body").style.display = "none";

};