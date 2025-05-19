async function loadComponent(id, basePath, withCss = false) {
  try {
    const html = await fetch(`${basePath}.html`).then((res) => res.text());
    document.getElementById(id).innerHTML = html;

    if (withCss) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${basePath}.css`;
      document.head.appendChild(link);
    }
  } catch (err) {
    console.error(`Ошибка при загрузке компонента ${id}:`, err);
  }
}

async function loadComponents() {
  await loadComponent("hero", "./src/components/Hero", true);
  await loadComponent("about", "./src/components/About", true);
  await loadComponent("footer", "./src/components/Footer", true);
  await loadComponent("header", "./src/components/Header", true);
  // Логика открытия/закрытия меню после загрузки хедера
  const refs = {
    openMenuBtn: document.querySelector("[data-menu-open]"),
    closeMenuBtn: document.querySelector("[data-menu-close]"),
    menu: document.querySelector("[data-menu]"),
  };

  if (refs.openMenuBtn && refs.closeMenuBtn && refs.menu) {
    refs.openMenuBtn.addEventListener("click", toggleMenu);
    refs.closeMenuBtn.addEventListener("click", toggleMenu);

    function toggleMenu() {
      refs.menu.classList.toggle("is-hidden");
      document.body.classList.toggle("no-scroll");
    }
  } else {
    console.error("Не найдены элементы меню:", refs);
  }
}

loadComponents();
