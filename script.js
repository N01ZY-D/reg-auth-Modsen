document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const authForm = document.getElementById("auth-form");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close");

  function showModal(message) {
    modal.querySelector("p").textContent = message;
    modal.classList.add("active");

    // Размытие всей страницы
    document.body.classList.add("blur");
  }

  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");

    // Убираем размытие после закрытия модального окна
    document.body.classList.remove("blur");
  });

  // Закрытие модального окна при клике вне его
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");

      // Убираем размытие после закрытия модального окна
      document.body.classList.remove("blur");
    }
  });

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        showModal("Пароли не совпадают!", "");
        return;
      }

      showModal("Регистрация успешна!");
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showModal("Registration/ authorization completed succesfully");
    });
  }
});
