const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

const submitButton = document.querySelector("input[type='submit']")

fetch("../json/users.json")
  .then(response => response.json())
  .then(data => {

    submitButton.addEventListener("click", function(event) {
      event.preventDefault();

      const username = usernameInput.value
      const password = passwordInput.value

      const admin = data.users.find(user => user.username === username && user.password === password && user.role === 'ADMIN')
      const customer = data.users.find(user => user.username === username && user.password === password && user.role === 'CUSTOMER')

      if (admin) {
        token()
        isLoggedIn()
        window.location.href = "inventory.html"

      } else if (customer) {
        token()
        isLoggedIn()
        window.location.href = "store.html"
      } 
      else {
        alert("Invalid username or password.")
      }

    });
});

function token(){
  const tokenGenerator = () => {

    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    const tokenLength = 8;
  
    let token = "";
    for (let i = 0; i < tokenLength; i++) {

      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters[randomIndex];
  
      token += randomChar;
    }
  
    return token;
  }

  localStorage.setItem('auth-token', tokenGenerator())
  
}

function isLoggedIn() {
  localStorage.setItem('isLoggedIn', true)
}