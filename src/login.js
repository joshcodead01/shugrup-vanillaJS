const usernameInput = document.getElementById("username")
const passwordInput = document.getElementById("password")

const submitButton = document.querySelector("input[type='submit']")

fetch("/users.json")
  .then(response => response.json())
  .then(data => {

    submitButton.addEventListener("click", function(event) {
      event.preventDefault();

      const username = usernameInput.value
      const password = passwordInput.value

      const admin = data.users.find(user => user.username === username && user.password === password && user.role === 'ADMIN')
      const customer = data.users.find(user => user.username === username && user.password === password && user.role === 'CUSTOMER')

      if (admin) {
          window.location.href = "/views/inventory.html"
      } else if (customer) {
        window.location.href = "/views/index.html"
      } 
      else {
        alert("Invalid username or password.")
      }


    });
  });
