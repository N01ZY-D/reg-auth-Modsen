document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const authForm = document.getElementById("auth-form");

  function loadCommonComponents() {
    return Promise.all([
      fetch("header.html")
        .then((response) => {
          if (!response.ok) throw new Error("Не удалось загрузить header.html");
          return response.text();
        })
        .then((data) => {
          document.getElementById("header-placeholder").innerHTML = data;
        })
        .catch((error) => console.error("Ошибка загрузки header:", error)),

      fetch("footer.html")
        .then((response) => {
          if (!response.ok) throw new Error("Не удалось загрузить footer.html");
          return response.text();
        })
        .then((data) => {
          document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch((error) => console.error("Ошибка загрузки footer:", error)),
    ]);
  }

  function showModal(message) {
    const modal = document.getElementById("modal");

    if (modal) {
      const modalText = modal.querySelector("p");
      if (modalText) {
        modalText.textContent = message;
        modal.classList.add("active");
        document.body.classList.add("blur");
      } else {
        console.error("Не найден элемент <p> внутри модального окна.");
      }
    } else {
      console.error("Модальное окно не найдено.");
    }
  }

  function initializeEvents() {
    const closeModal = document.querySelector(".close");
    const modal = document.getElementById("modal");

    if (closeModal) {
      closeModal.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modal) {
          modal.classList.remove("active");
          document.body.classList.remove("blur");
        }
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.classList.remove("blur");
        }
      });
    }
  }

  function validateInput(input, regex, errorMsg) {
    const errorSpan = input.parentElement.querySelector(".error-message");
    const errorIcon = input.parentElement.querySelector(".error-icon");
    const label = input.parentElement.querySelector("label");

    if (!regex.test(input.value.trim())) {
      errorSpan.textContent = errorMsg;
      errorIcon.style.display = "inline";
      input.classList.add("error-border");
      label.classList.add("error-label");
      return false;
    } else {
      errorSpan.textContent = "";
      errorIcon.style.display = "none";
      input.classList.remove("error-border");
      label.classList.remove("error-label");
      return true;
    }
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const surnameInput = document.getElementById("surname");
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const confirmPasswordInput = document.getElementById("confirm-password");

      let isValid = true;

      isValid &= validateInput(
        nameInput,
        /^[A-Za-zА-Яа-яЁё]{2,30}$/,
        "Enter valid name"
      );
      isValid &= validateInput(
        surnameInput,
        /^[A-Za-zА-Яа-яЁё]{2,30}$/,
        "Enter valid surname"
      );
      isValid &= validateInput(
        emailInput,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email address is incorrect"
      );
      isValid &= validateInput(
        passwordInput,
        /^[A-Za-z0-9!@#$%^&*()_+=-]{6,30}$/,
        "The password must be between 6 and 30 characters"
      );

      // Проверка на совпадение паролей
      const confirmPasswordErrorSpan =
        confirmPasswordInput.parentElement.querySelector(".error-message");
      const confirmPasswordErrorIcon =
        confirmPasswordInput.parentElement.querySelector(".error-icon");
      const confirmPasswordLabel =
        confirmPasswordInput.parentElement.querySelector("label");
      if (passwordInput.value !== confirmPasswordInput.value) {
        isValid = false;
        confirmPasswordErrorSpan.textContent = "Passwords don't match";
        confirmPasswordErrorIcon.style.display = "inline";
        confirmPasswordInput.classList.add("error-border");
        confirmPasswordLabel.classList.add("error-label");
      } else {
        confirmPasswordErrorSpan.textContent = "";
        confirmPasswordErrorIcon.style.display = "none";
        confirmPasswordInput.classList.remove("error-border");
        confirmPasswordLabel.classList.remove("error-label");
      }

      if (isValid) {
        showModal("Registartion/ Authorization completed successfully!");
      }
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("auth-email");
      const passwordInput = document.getElementById("auth-password");

      let isValid = true;

      isValid &= validateInput(
        emailInput,
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email address is incorrect"
      );
      isValid &= validateInput(
        passwordInput,
        /^.{6,30}$/,
        "The password must be between 6 and 30 characters"
      );

      if (isValid) {
        showModal("Registartion/ Authorization completed successfully!");
      }
    });
  }

  loadCommonComponents().then(() => {
    const regPage = document.getElementById("regLink");
    const authPage = document.getElementById("authLink");

    if (regPage && authPage) {
      if (registerForm) {
        regPage.style.color = "#f17900";
        authPage.style.color = "#fffdfa";
      } else if (authForm) {
        regPage.style.color = "#fffdfa";
        authPage.style.color = "#f17900";
      }
    }
  });

  initializeEvents();
});
