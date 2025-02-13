document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const authForm = document.getElementById("auth-form");

  // Функция для загрузки header и footer
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

  // Функция для отображения модального окна
  function showModal(message) {
    const modal = document.getElementById("modal");

    if (modal) {
      const modalText = modal.querySelector("p");
      if (modalText) {
        modalText.textContent = message;
        modal.classList.add("active");

        // Размытие всей страницы
        document.body.classList.add("blur");
      } else {
        console.error("Не найден элемент <p> внутри модального окна.");
      }
    } else {
      console.error("Модальное окно не найдено.");
    }
  }

  // Функция для инициализации обработчиков событий
  function initializeEvents() {
    const closeModal = document.querySelector(".close");
    const modal = document.getElementById("modal");

    if (closeModal) {
      closeModal.addEventListener("click", (e) => {
        e.stopPropagation(); // Останавливаем распространение события, чтобы оно не "попало" на модальное окно
        if (modal) {
          modal.classList.remove("active");
          document.body.classList.remove("blur");
        }
      });
    }

    // Закрытие модального окна при клике вне его
    if (modal) {
      modal.addEventListener("click", (e) => {
        // Закрытие только при клике на сам фон (мимо контента модального окна)
        if (e.target === modal) {
          modal.classList.remove("active");
          document.body.classList.remove("blur");
        }
      });
    }
  }

  // Обработчики для форм
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Блокируем стандартное поведение формы

      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (password !== confirmPassword) {
        showModal("Пароли не совпадают!");
        return;
      }

      showModal("Регистрация успешна!");
    });
  }

  if (authForm) {
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showModal("Registartion/ authorization completed successfully!");
    });
  }

  // Загружаем общие компоненты при загрузке страницы
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

  // После загрузки всех компонентов, инициализируем обработчики событий
  initializeEvents();
});
