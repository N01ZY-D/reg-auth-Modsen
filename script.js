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
    const parent = input.parentElement;
    const errorSpan = parent.querySelector(".error-message");
    const errorIcon = parent.querySelector(".error-icon");
    const label = parent.querySelector("label");
    const isValid = regex.test(input.value.trim());

    errorSpan.textContent = isValid ? "" : errorMsg;
    errorIcon.style.display = isValid ? "none" : "inline";
    input.classList.toggle("error-border", !isValid);
    label.classList.toggle("error-label", !isValid);

    return isValid;
  }

  function validatePasswordMatch(passwordInput, confirmPasswordInput) {
    const confirmParent = confirmPasswordInput.parentElement;
    const confirmErrorSpan = confirmParent.querySelector(".error-message");
    const confirmErrorIcon = confirmParent.querySelector(".error-icon");
    const confirmLabel = confirmParent.querySelector("label");
    const isValid = passwordInput.value === confirmPasswordInput.value;

    confirmErrorSpan.textContent = isValid ? "" : "Passwords don't match";
    confirmErrorIcon.style.display = isValid ? "none" : "inline";
    confirmPasswordInput.classList.toggle("error-border", !isValid);
    confirmLabel.classList.toggle("error-label", !isValid);

    return isValid;
  }

  function handleFormSubmit(form, validationRules, onSuccess) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      validationRules.forEach(({ input, regex, errorMsg }) => {
        if (!validateInput(input, regex, errorMsg)) {
          isValid = false;
        }
      });

      if (form.id === "register-form") {
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput =
          document.getElementById("confirm-password");
        if (!validatePasswordMatch(passwordInput, confirmPasswordInput)) {
          isValid = false;
        }
      }

      if (isValid) onSuccess();
    });
  }

  if (registerForm) {
    handleFormSubmit(
      registerForm,
      [
        {
          input: document.getElementById("name"),
          regex: /^[A-Za-zА-Яа-яЁё]{2,30}$/,
          errorMsg: "Enter valid name",
        },
        {
          input: document.getElementById("surname"),
          regex: /^[A-Za-zА-Яа-яЁё]{2,30}$/,
          errorMsg: "Enter valid surname",
        },
        {
          input: document.getElementById("email"),
          regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          errorMsg: "Email address is incorrect",
        },
        {
          input: document.getElementById("password"),
          regex: /^[A-Za-z0-9!@#$%^&*()_+=-]{6,30}$/,
          errorMsg: "The password must be between 6 and 30 characters",
        },
      ],
      () => showModal("Registration/Authorization completed successfully!")
    );
  }

  if (authForm) {
    handleFormSubmit(
      authForm,
      [
        {
          input: document.getElementById("auth-email"),
          regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          errorMsg: "Email address is incorrect",
        },
        {
          input: document.getElementById("auth-password"),
          regex: /^.{6,30}$/,
          errorMsg: "The password must be between 6 and 30 characters",
        },
      ],
      () => showModal("Registration/Authorization completed successfully!")
    );
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
