document.addEventListener("DOMContentLoaded", () => {
  // Получение элементов DOM
  const blockButtonsContainer = document.getElementById("block-buttons");
  const cardsContainer = document.getElementById("cards-container");
  const showAllBtn = document.getElementById("show-all-btn");
  const hideAllBtn = document.getElementById("hide-all-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const body = document.body;

  let currentBlockIndex = 0;

  // Функция для переключения темы
  function toggleTheme() {
    body.classList.toggle("dark-mode");
    // Сохраняем выбор пользователя
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  // Проверяем сохраненную тему при загрузке
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
  }

  // Обработчик кнопки смены темы
  themeToggleBtn.addEventListener("click", toggleTheme);

  // Функция для создания кнопок выбора блоков
  function createBlockButtons() {
    translationBlocks.forEach((_, index) => {
      const button = document.createElement("button");
      button.className = "block-button";
      button.textContent = `Блок ${index + 1}`;
      button.addEventListener("click", () => {
        currentBlockIndex = index;
        renderCards(translationBlocks[currentBlockIndex]);
        updateActiveButtonState(button);
      });
      blockButtonsContainer.appendChild(button);
    });
    // Активируем первую кнопку по умолчанию
    updateActiveButtonState(
      blockButtonsContainer.querySelector(".block-button")
    );
  }

  // Функция для обновления активной кнопки
  function updateActiveButtonState(activeButton) {
    document.querySelectorAll(".block-button").forEach((btn) => {
      btn.classList.remove("active");
    });
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  // Функция для отрисовки карточек
  function renderCards(block) {
    cardsContainer.innerHTML = "";
    block.forEach((item) => {
      // Карточка с русским предложением (всегда видна)
      const russianCard = document.createElement("div");
      russianCard.className = "card russian-card visible";
      russianCard.innerHTML = `<p class="card-text">${item.russian}</p>`;
      cardsContainer.appendChild(russianCard);

      // Карточка с утвердительным переводом
      const englishCard = createTranslationCard(item.english, "=");
      cardsContainer.appendChild(englishCard);

      // Карточка с отрицательным переводом
      const negativeCard = createTranslationCard(item.negative, "-");
      cardsContainer.appendChild(negativeCard);

      // Карточка с вопросительным переводом
      const interrogativeCard = createTranslationCard(item.interrogative, "?");
      cardsContainer.appendChild(interrogativeCard);
    });
  }

  // Функция-фабрика для создания карточек-переводов с символом
  function createTranslationCard(text, symbol) {
    const card = document.createElement("div");
    card.className = "card card-translation hidden";
    card.innerHTML = `<p class="card-text">${text}</p><span class="card-symbol">${symbol}</span>`;

    // Логика показа/скрытия по клику
    card.addEventListener("click", () => {
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
        card.classList.add("visible");
      } else {
        card.classList.remove("visible");
        card.classList.add("hidden");
      }
    });
    return card;
  }

  // Обработчик кнопки "Показать все"
  showAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card-translation").forEach((card) => {
      card.classList.remove("hidden");
      card.classList.add("visible");
    });
  });

  // Обработчик кнопки "Скрыть все"
  hideAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".card-translation").forEach((card) => {
      card.classList.remove("visible");
      card.classList.add("hidden");
    });
  });

  // Инициализация приложения при загрузке
  createBlockButtons();
  renderCards(translationBlocks[currentBlockIndex]);
});
