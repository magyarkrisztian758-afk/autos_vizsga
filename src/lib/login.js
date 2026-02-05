export function initializeLoginForm() {
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")
  const registerLink = document.getElementById("registerLink")
  const loginLink = document.getElementById("loginLink")
  const loginContainer = document.querySelector(".login-container")
  const registerContainer = document.querySelector(".register-container")

  const passwordToggles = document.querySelectorAll(".password-toggle")
  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("mousedown", (e) => {
      e.preventDefault()
      const targetId = toggle.getAttribute("data-target")
      const input = document.getElementById(targetId)
      input.type = input.type === "password" ? "text" : "password"
    })

    toggle.addEventListener("mouseup", (e) => {
      e.preventDefault()
      const targetId = toggle.getAttribute("data-target")
      const input = document.getElementById(targetId)
      input.type = "password"
    })

    toggle.addEventListener("mouseleave", () => {
      const targetId = toggle.getAttribute("data-target")
      const input = document.getElementById(targetId)
      input.type = "password"
    })
  })

  if (registerLink) {
    registerLink.addEventListener("click", (e) => {
      e.preventDefault()
      loginContainer.classList.add("hidden")
      registerContainer.classList.remove("hidden")
    })
  }

  if (loginLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault()
      registerContainer.classList.add("hidden")
      loginContainer.classList.remove("hidden")
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      if (email && password) {
        localStorage.setItem('user', JSON.stringify({
          email: email,
          loggedIn: true,
          role: 'user',
          isAdmin: false,
          loginTime: new Date().toISOString()
        }))
        localStorage.setItem('showLoginSuccess', 'true')
        window.location.href = "/"
      } else {
        alert("Kérjük, töltse ki az összes mezőt!")
      }
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("regEmail").value
      const birthDate = document.getElementById("birthDate").value
      const password = document.getElementById("regPassword").value
      const confirmPassword = document.getElementById("confirmPassword").value
      if (password !== confirmPassword) {
        alert("A jelszavak nem egyeznek!")
        return
      }
      if (email && birthDate && password) {
        localStorage.setItem('user', JSON.stringify({
          email: email,
          birthDate: birthDate,
          loggedIn: true,
          registrationTime: new Date().toISOString()
        }))
        alert("Regisztráció sikeres!")
        registerContainer.classList.add("hidden")
        loginContainer.classList.remove("hidden")
      } else {
        alert("Kérjük, töltse ki az összes mezőt!")
      }
    })
  }
}